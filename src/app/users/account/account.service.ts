import { Injectable } from '@angular/core';
import { AuthenticateService } from '../authenticate/authenticate.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { handleError } from 'src/app/debug/http-error-handler';
import { AuthHttpResponse } from 'src/app/server/http/auth-http-response';
import { Constants } from 'src/app/constants';
import { Observable, of } from 'rxjs';
import { BasicHttpResponse } from 'src/app/server/http/basic-http-response';
import { RecoverPasswordResponse } from 'src/app/server/http/recover-password-response';
import { JwtDetails } from '../authenticate/jwt/jwt-details';
import { NotificationsResponse } from 'src/app/server/http/notifications-response';
import { AuthFetchResponse } from 'src/app/server/http/auth-fetch-response';
import { AccountDetailsResponse } from 'src/app/server/http/account-details-response';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  jsonHeaders = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(
    private http: HttpClient,
    private authService: AuthenticateService) { }

  public async changeDetails(accDetailsResp: AccountDetailsResponse): Promise<string> {
    if (!this.authService.isLoggedIn()) {
      console.error("Cant change details when not logged in");
      return null;
    }
    const resp: BasicHttpResponse = await this.http.post<BasicHttpResponse>(Constants.changeAccDetails, accDetailsResp, this.jsonHeaders)
      .pipe(tap(_ => console.log("changeDetails"))
      , catchError(handleError<BasicHttpResponse>('account/details/change'))).toPromise();

    return !resp.success ? resp.message : null;
  }
  
  public async fetchUser(): Promise<string> {
    if (!this.authService.isLoggedIn()) {
      console.error("Cant fetch user when not logged in");
      return null;
    }
    const authFetchResp: AuthFetchResponse = await this.http.post<AuthFetchResponse>(Constants.authFetchUrl, {
        username: this.authService.authedUser.emailAddress, 
        ref: 'account'
      }, this.jsonHeaders)
      .pipe(tap(_ => console.log("fetchUser"))
      , catchError(handleError<AuthFetchResponse>('account/fetch'))).toPromise();

    if (!authFetchResp.success) {
      return authFetchResp.message;
    }
    this.authService.loadUser(authFetchResp);
    return null;
  }

  public fetchNotifications(): Observable<NotificationsResponse> {
    if (!this.authService.isLoggedIn()) {
      console.error("Cant fetch notifications when not logged in");
      return null;
    }
    const httpOptions = {
      headers: { 'Content-Type': 'application/json' },
      params: {
        'name': encodeURIComponent(this.authService.authedUser.emailAddress)
      }
    }
    return this.http.get<NotificationsResponse>(Constants.fetchNotifsUrl, httpOptions)
      .pipe(tap(_ => console.log("fetchNotifications"))
      , catchError(handleError<NotificationsResponse>('account/notifs')));
  }

  public async changeEmail(newEmailAddress: string): Promise<string> {
    if (!this.authService.isLoggedIn()) {
      console.error("Can't change email when not logged in");
      return null;
    }
    let refreshToken = this.authService.jwtService.getStoredJwtDetails().refreshToken;

    const authResp: AuthHttpResponse = await this.http.post<AuthHttpResponse>(Constants.changeEmailAddressUrl, {
        username: this.authService.authedUser.emailAddress, 
        refreshToken: refreshToken,
        newEmailAddress: newEmailAddress
      }, this.jsonHeaders)
      .pipe(tap(_ => console.log("changeEmail"))
      , catchError(handleError<AuthHttpResponse>('account/email/change'))).toPromise();

    if (!authResp.success) {
      return authResp.message;
    }
    const postAuthResp: string = await this.authService.postAuthenticate(newEmailAddress, authResp, "log");

    if (postAuthResp != null) {
      return postAuthResp;
    }
    return null;
  }

  public requestConfirmationEmail(): Observable<BasicHttpResponse> {
    if (!this.authService.isLoggedIn()) {
      console.error("Can't request confirmation email when not logged in");

      const resp: BasicHttpResponse = {
        success: false,
        message: "Something went wrong"
      };
      return of(resp);
    }
    const httpOptions = {
      headers: { 'Content-Type': 'application/json' },
      params: {
        'name': encodeURIComponent(this.authService.authedUser.emailAddress)
      }
    }
    return this.http.get<BasicHttpResponse>(Constants.requestEmailConfirmationLinkUrl, httpOptions)
      .pipe(tap(_ => console.log("requestConfirmationEmail"))
      , catchError(handleError<BasicHttpResponse>('account/email/request')));
  }

  public async confirmEmail(username: string, validationToken: string): Promise<string> {
    if (this.authService.isLoggedIn() && this.authService.authedUser.emailAddress != username) {
      return "Invalid confirmation link";
    }
    const httpOptions = {
      headers: { 'Content-Type': 'application/json' },
      params: {
        't': encodeURIComponent(validationToken),
        'u': encodeURIComponent(username)
      }
    };
    const authResp: AuthHttpResponse = await this.http.get<AuthHttpResponse>(Constants.confirmEmailAddressUrl, httpOptions)
      .pipe(tap(_ => console.log("confirmEmail"))
      , catchError(handleError<AuthHttpResponse>('account/email/confirm'))).toPromise();

    if (!authResp.success) {
      return authResp.message;
    }
    const postAuthResp: string = await this.authService.postAuthenticate(username, authResp, "log");

    if (postAuthResp != null) {
      return postAuthResp;
    }
    return null;
  }

  public changePassword(currentPassword: string, newPassword: string): Observable<AuthHttpResponse> {
    if (!this.authService.isLoggedIn()) {
      console.error("Can't update password while not logged in");
      return;
    }
    let refreshToken = this.authService.jwtService.getStoredJwtDetails().refreshToken;

    return this.http.post<AuthHttpResponse>(Constants.changePasswordUrl, {
        username: this.authService.authedUser.emailAddress, 
        refreshToken: refreshToken,
        resetToken: "",
        currentPassword: currentPassword,
        newPassword: newPassword }, this.jsonHeaders)
      .pipe(tap(_ => console.log("changePassword"))
      , catchError(handleError<AuthHttpResponse>('account/password/change')));
  }

  public updatePassword(username: string, newPassword: string, resetToken: string): Observable<AuthHttpResponse> {
    return this.http.post<AuthHttpResponse>(Constants.updatePasswordUrl, {
        username: username, 
        refreshToken: "",
        resetToken: resetToken,
        currentPassword: "",
        newPassword: newPassword }, this.jsonHeaders)
      .pipe(tap(_ => console.log("updatePassword"))
      , catchError(handleError<AuthHttpResponse>('account/password/update')));
  }

  public accountRecoveryRequest(username: string): Observable<RecoverPasswordResponse> {
    if (this.authService.isLoggedIn()) {
      console.error("Account recovery not available while logged in");
      return;
    }
    const httpOptions = {
      headers: { 'Content-Type': 'application/json' },
      params: {'name': encodeURIComponent(username)}
    };
    return this.http.get<RecoverPasswordResponse>(Constants.resetPasswordRequestUrl, httpOptions)
      .pipe(tap(_ => console.log("accountRecoveryRequest"))
      , catchError(handleError<RecoverPasswordResponse>('account/recovery/request')));
  }

}
