import { Injectable } from '@angular/core';
import { User } from '../user';
import { Router } from '@angular/router';
import { AccountState } from '../account-state';
import { Constants } from 'src/app/constants';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { handleError } from 'src/app/debug/http-error-handler';
import { BasicHttpResponse } from 'src/app/server/http/basic-http-response';
import { AuthHttpResponse } from 'src/app/server/http/auth-http-response';
import { JwtService } from './jwt/jwt.service';
import { JwtDetails } from './jwt/jwt-details';

const authedUserKey: string = "authed_user";

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  jsonHeaders = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  public authedUser: User;


  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtService: JwtService) { 
    this.loadStoredUser();
  }

  public isLoggedIn(): boolean {
    return this.hasAuthedUser() && this.jwtService.isAuthed();
  }

  public hasAuthedUser(): boolean {
    return this.authedUser != null;
  }

  public hasNotifications(): boolean {
    return true;
  }

  public register(user: User): string {
    if (this.isLoggedIn()) {
      this.router.navigateByUrl("/");
      return;
    }
    let errorMessage: string = null;

    this.http.post<AuthHttpResponse>(Constants.registerUrl, user, this.jsonHeaders)
      .pipe(tap(_ => console.log("Register " + user.emailAddress))
      , catchError(handleError<AuthHttpResponse>('authenticate/register')))
      .subscribe(resp => resp.success ? this.router.navigateByUrl("/") : errorMessage = resp.message);
    return errorMessage; //TODO implement jwt shit
  }

  public login(username: string, password: string): string {
    if (this.isLoggedIn()) {
      this.router.navigateByUrl("/");
      return;
    }
    let errorMessage: string = null;

    this.http.post<AuthHttpResponse>(Constants.loginUrl, {username: username, password: password}, this.jsonHeaders)
      .pipe(tap(_ => console.log("Login " + username))
      , catchError(handleError<AuthHttpResponse>('authenticate/login')))
      .subscribe(resp => resp.success ? this.postLogin(resp) : errorMessage = resp.message);
    return errorMessage; //TODO implement jwt shit
  }

  private postLogin(authHttpResp: AuthHttpResponse) {
    let jwtDetails: JwtDetails = new JwtDetails(authHttpResp.token, authHttpResp.refreshToken);
    this.jwtService.storeJwt(jwtDetails);

    //TODO call user details
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

  private loadUser(user: User): void {
    this.authedUser = user;
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

    //TODO temp debug
    this.authedUser = new User();
    this.authedUser.displayName = "MyDisplayName";
    this.authedUser.emailAddress = "email@email.com";
    this.authedUser.accountState = AccountState.Administrator;
    this.authedUser.password = "password";
    
      console.warn("No stored user found to load");
      return;
    }
    this.authedUser = JSON.parse(storedUserVal);
    this.router.navigateByUrl(this.authedUser.lastRoute);
    console.log("Loaded stored user");
  }

  public storeUser(): void {
    if (!this.isLoggedIn()) {
      console.error("Can't store user since none is logged in");
      return;
    }
    this.authedUser.lastRoute = this.router.url;
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
