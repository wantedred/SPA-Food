import { Injectable } from '@angular/core';
import { AuthenticateService } from '../authenticate/authenticate.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
    //caches.keys.
  }

  public updatePassword(oldPassword: string, newPassword: string): void {

  }

  public resetPassword(): void {

  }

  public updateDetails() {

  }

  

}
