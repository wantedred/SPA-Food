import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Constants } from 'src/app/constants';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  jsonHeaders = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  public user: User;
  loggedIn : boolean = false;
  

  constructor(
    private http: HttpClient, 
    private router: Router) { }

  ngOnInit(): void {
  }

  public login(email: string, password: string) : Observable<User> {
    return this.http.post<User>(Constants.loginUrl,
      JSON.stringify({email, password}), this.jsonHeaders
    ).pipe(tap(data => {
      console.log("making request to get user logged in!");
      if (localStorage.getItem('currentUser')) {
        localStorage.removeItem('currentUser');
      }
      this.user = data;
      console.log("current user email: " + this.user.emailAddress);
      localStorage.setItem('currentUser', JSON.stringify(this.user));
      this.loggedIn = true;
      this.router.navigateByUrl("/account");
    }));
  }

}
