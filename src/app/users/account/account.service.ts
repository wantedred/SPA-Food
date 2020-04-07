import { Injectable } from '@angular/core';
import { AuthenticateService } from '../authenticate/authenticate.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { handleError } from 'src/app/debug/http-error-handler';
import { AuthHttpResponse } from 'src/app/server/http/auth-http-response';
import { Constants } from 'src/app/constants';
import { Observable } from 'rxjs';
import { BasicHttpResponse } from 'src/app/server/http/basic-http-response';
import { RecoverPasswordResponse } from 'src/app/server/http/recover-password-response';

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

  public fetch() {
    //
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
