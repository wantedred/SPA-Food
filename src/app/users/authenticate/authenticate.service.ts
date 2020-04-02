import { Injectable } from '@angular/core';
import { User } from '../user';
import { Router } from '@angular/router';
import { AccountState } from '../account-state';
import { Constants } from 'src/app/constants';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { tap, catchError, flatMap } from 'rxjs/operators';
import { handleError } from 'src/app/debug/http-error-handler';
import { BasicHttpResponse } from 'src/app/server/http/basic-http-response';
import { AuthHttpResponse } from 'src/app/server/http/auth-http-response';
import { JwtService } from './jwt/jwt.service';
import { JwtDetails } from './jwt/jwt-details';
import { AuthFetchResponse } from 'src/app/server/http/auth-fetch-response';
import { Observable } from 'rxjs';

const authedUserKey: string = "authed_user";

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  jsonHeaders = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  public authedUser: User;
  private username: string;


  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtService: JwtService) { 
    this.loadStoredUser();
  }

  public isLoggedIn(): boolean {
    return this.jwtService.isAuthed() && this.hasAuthedUser();
  }

  public hasAuthedUser(): boolean {
    return this.authedUser != null;
  }

  public hasNotifications(): boolean {
    return true;
  }

  public validateEmail(emailAddress: string): Observable<BasicHttpResponse> {
    let params = new HttpParams().set("name", encodeURIComponent(emailAddress));
    let jsonHeaders: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

    return this.http.get<BasicHttpResponse>(Constants.validateEmailAddressUrl, {headers: jsonHeaders, params: params})
      .pipe(tap(_ => console.log("Validate email " + emailAddress))
      , catchError(handleError<BasicHttpResponse>('account/validate/email')));
  }

  public async register(user: User): Promise<string> {
    if (this.isLoggedIn()) {
      this.router.navigateByUrl("/");
      return;
    }
    console.log("register request");
    const regResp: AuthHttpResponse = await this.http.post<AuthHttpResponse>(Constants.registerUrl, user, this.jsonHeaders)
      .pipe(tap(_ => console.log("Register " + user.emailAddress))
      , catchError(handleError<AuthHttpResponse>('authenticate/register'))).toPromise();

    if (!regResp.success) {
      return regResp.message;
    }
    console.log("Post authenticate");
    const postAuthResp: string = await this.postAuthenticate(user.emailAddress, regResp, "reg");

    if (postAuthResp != null) {
      return postAuthResp;
    }
    console.log("Finished registration");
    return null;
      //resp => resp.success ? this.postAuthenticate(user.emailAddress, resp, "reg") : errorMessage = resp.message
  }

  public async login(username: string, password: string): Promise<string> {
    console.log("Logging in");

    if (this.isLoggedIn()) {
      this.router.navigateByUrl("/");
      return;
    }
    console.log("Login request");
    const authResp: AuthHttpResponse = await this.http.post<AuthHttpResponse>(Constants.loginUrl, {username: username, password: password}, this.jsonHeaders)
      .pipe(tap(_ => console.log("Login " + username))
      , catchError(handleError<AuthHttpResponse>('authenticate/login'))).toPromise();

    if (!authResp.success) {
      return authResp.message;
    }
    console.log("Post authenticate");
    const postAuthResp: string = await this.postAuthenticate(username, authResp, "log");

    if (postAuthResp != null) {
      return postAuthResp;
    }
    console.log("Finished login");
    return null;

    /*return this.http.post<AuthHttpResponse>(Constants.loginUrl, {username: username, password: password}, this.jsonHeaders)
      .pipe(tap(_ => console.log("Login " + username))
      , catchError(handleError<AuthHttpResponse>('authenticate/login')))*/
    //.subscribe(resp => resp.success ? this.postAuthenticate(username, resp, "log") : errorMessage = resp.message);
  }

  private async postAuthenticate(username: string, authHttpResp: AuthHttpResponse, ref: string): Promise<string> {
    let jwtDetails: JwtDetails = new JwtDetails(authHttpResp.token, authHttpResp.refreshToken);
    this.jwtService.storeJwt(jwtDetails);

    console.log("Auth fetching user");
    const authFetchRespMsg: string = await this.authFetch(ref, username);

    if (authFetchRespMsg != null) {
      return authFetchRespMsg;
    }
    if (!this.isLoggedIn()) {
      return "Failed to login";
    }
    console.log("Auth fetched user");
    return null;
    //this.router.navigateByUrl(this.authedUser.lastRoute);
  }

  private async authFetch(ref: string, username: string = null): Promise<string> {
    if (username == null) {
      if (this.authedUser == null) {
        return "No username given and no user logged in";
      }
      username = this.authedUser.emailAddress;
    }
    if (!this.jwtService.isAuthed()) {
      return "Not authorized";
    }
    const authFetchResp: AuthFetchResponse = await this.http.post<AuthFetchResponse>(Constants.authFetchUrl, {username: username, ref: ref}, this.jsonHeaders)
      .pipe(tap(_ => console.log("AuthFetch " + username))
      , catchError(handleError<AuthFetchResponse>('authenticate/fetch'))).toPromise();

    if (!authFetchResp.success) {
      return authFetchResp.message;
    }
    this.loadUser(authFetchResp);
    return null;
  }

  public logout(): void {
    if (!this.isLoggedIn()) {
      console.error("Can't logout user since none is loaded");
      return;
    }
    this.http.post<AuthHttpResponse>(Constants.logoutUrl, {
      username: this.authedUser.emailAddress, 
      refreshToken: this.jwtService.getStoredJwtDetails().refreshToken
    }, this.jsonHeaders)
      .pipe(tap(_ => console.log("Logout"))
      , catchError(handleError<AuthHttpResponse>('authenticate/logout')))
      .subscribe(resp => resp.success ? this.postLogout() : console.error(resp.message));
  }

  private postLogout(): void {
    this.removeFromStorage(authedUserKey);
    this.jwtService.removeJwtFromStorage();
    this.authedUser = null;
    this.router.navigateByUrl("/");
    console.log("Logged out");
  }

  public delete(): void {
    if (!this.isLoggedIn()) {
      console.error("Can't delete user since none is loaded");
      this.router.navigateByUrl("/auth/login");
      return;
    }
    this.http.post<BasicHttpResponse>(Constants.deleteAccountUrl, {username: this.authedUser.emailAddress, password: this.authedUser.password}, this.jsonHeaders)
      .pipe(tap(_ => console.log("deleted user " + this.authedUser.emailAddress))
      , catchError(handleError<BasicHttpResponse>('authenticate/delete')))
      .subscribe(resp => resp.success ? this.logout() : console.error(resp.message));
  }

  private loadUser(resp: AuthFetchResponse): void {
    this.loadStoredUser();

    if (this.authedUser == null) {
      this.authedUser = new User();
    }
    this.authedUser.emailAddress = resp.emailAddress;
    this.authedUser.accountState = resp.accountState;
    this.authedUser.activity = resp.activityLevel;
    this.authedUser.displayName = resp.displayName;
    this.authedUser.dob = resp.dob;
    this.authedUser.height = resp.height;
    this.authedUser.weight = resp.weight;
    this.authedUser.pregnant = resp.pregnant;
    this.authedUser.smoker = resp.smoker;
    this.authedUser.sex = resp.sex;
    this.authedUser.lactating = resp.lactating;
    this.authedUser.joinedAt = resp.joinedAt;

    this.storeUser();
    this.router.navigateByUrl(this.authedUser.lastRoute);
  }

  private loadStoredUser(): void {
    if (this.isLoggedIn()) {
      console.warn("Loading stored user while one is already loaded");
    }
    let storedUserVal:string = this.getStoredValue(authedUserKey);

    if (storedUserVal == null) {
      this.authedUser = null;
      console.warn("No stored user found to load");
      return;
    }
    this.authedUser = JSON.parse(storedUserVal);
    console.log("Loaded stored user");
  }

  public storeUser(): void {
    if (!this.isLoggedIn()) {
      console.error("Can't store user since none is logged in");
      return;
    }
    this.authedUser.lastRoute = this.router.url.includes("auth") ? "/" : this.router.url;
    this.store(authedUserKey, this.authedUser);
  }

  public hasStored(key: string): boolean {
    return this.getStoredValue(key) != null;
  }

  public getStoredValue(key: string): any {
    return localStorage.getItem(key);
  }

  public store(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
    console.log("Stored " + key + " => " + this.getStoredValue(key));
  }

  public removeFromStorage(key: string): void {
    localStorage.removeItem(key);
    console.log("Removed stored item " + key);
  }

}
