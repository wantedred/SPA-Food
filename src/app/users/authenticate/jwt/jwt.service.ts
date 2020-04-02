import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { JwtDetails } from './jwt-details';
import { AuthHttpResponse } from 'src/app/server/http/auth-http-response';
import { tap, catchError } from 'rxjs/operators';
import { Constants } from 'src/app/constants';
import { handleError } from 'src/app/debug/http-error-handler';

const jwtStorageKey: string = "jwt";

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  jsonHeaders = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(private http: HttpClient) { }

  public isAuthed(): boolean {
    return this.getStoredJwtDetails() != null;
  }

  public refreshJwt() {
    let jwtDetails: JwtDetails = this.getStoredJwtDetails();

    if (!jwtDetails) {
      console.error("Unable to refresh JWT since no details were found");
      return;
    }
    return this.http.post<AuthHttpResponse>(Constants.refreshJwtUrl, jwtDetails, this.jsonHeaders)
      .pipe(tap((resp: AuthHttpResponse) => {
        if (resp.success) {
          let jwtDetails: JwtDetails = new JwtDetails(resp.token, resp.refreshToken);
          this.storeJwt(jwtDetails);
          return resp;
        }
        console.error(resp.message);
        return resp;
      }), catchError(handleError<AuthHttpResponse>('authenticate/jwt')));
  }

  public getStoredJwtDetails(): JwtDetails {
    let json: string = localStorage.getItem(jwtStorageKey);

    if (!json) {
      console.error("Failed to find stored JWT details");
      return null;
    }
    return JSON.parse(json);
  }

  public storeJwt(jwt: JwtDetails): void {
    localStorage.setItem(jwtStorageKey, JSON.stringify(jwt));
  }

  public removeJwtFromStorage(): void {
    localStorage.removeItem(jwtStorageKey);
  }

}
