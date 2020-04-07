import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap, tap } from 'rxjs/operators';
import { JwtDetails } from './jwt-details';
import { AuthenticateService } from '../authenticate.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    

    constructor(public authService: AuthenticateService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      let jwtDetails: JwtDetails = this.authService.jwtService.getStoredJwtDetails();
      let token: string = jwtDetails ? jwtDetails.token : null;

      let apiVersion: string = this.authService.jwtService.getApiVersion();

      if (apiVersion || token) {
        request = this.prepareHeaders(request, token, apiVersion);
      }
      return <any> next.handle(request)
        .pipe(tap(evt => {
            if (evt instanceof HttpResponse) {
              let newApiVersion: string = evt.headers.get("X-Api-Version");

              if (newApiVersion) {
                if (apiVersion) {
                  //TODO updates required?
                }
                this.authService.jwtService.storeApiVersion(newApiVersion);
              }
            }
          }),
          catchError(error => {
          if (error instanceof HttpErrorResponse && error.status === 401) {
            return this.handle401Error(request, next);
          } else {
            return throwError(error);
          }
          })
        );
    }

    private prepareHeaders(request: HttpRequest<any>, token: string, apiVersion: string): HttpRequest<any> {
      if (!token && !apiVersion) {
        return request;
      }
      if (token && apiVersion) {
        return request.clone({
          setHeaders: {
            'Authorization': `Bearer ${token}`,
            'X-Api-Version': apiVersion
          }
        });
      }
      if (token) {
        return request.clone({
          setHeaders: {
            'Authorization': `Bearer ${token}`
          }
        });
      }
      if (apiVersion) {
        return request.clone({
          setHeaders: {
            'X-Api-Version': apiVersion
          }
        });
      }
      console.error("Failed to prepare headers");
      return request;
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
      let apiVersion: string = this.authService.jwtService.getApiVersion();

      if (!this.isRefreshing) {
        this.isRefreshing = true;
        this.refreshTokenSubject.next(null);
    
        return this.authService.refreshJwt().pipe(
          switchMap((token: any) => {
            this.isRefreshing = false;
            this.refreshTokenSubject.next(token.jwt);
            return next.handle(this.prepareHeaders(request, token.jwt, apiVersion));
          })
        );
      } else {
        return this.refreshTokenSubject.pipe(
          filter(token => token != null),
          take(1),
          switchMap(jwt => {
            return next.handle(this.prepareHeaders(request, jwt, apiVersion));
          })
        );
      }
    }

}