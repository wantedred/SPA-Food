import { Injectable } from '@angular/core';
import { User } from '../user';
import { Router } from '@angular/router';

const authedUserKey: string = "authed_user";

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  public authedUser: User;


  constructor(private router: Router) { 
    this.loadStoredUser();
  }

  public isLoggedIn(): boolean {
    return this.authedUser != null;
  }

  public logout(): void {
    if (!this.isLoggedIn()) {
      console.error("Can't logout user since none is loaded");
      return;
    }
    this.removeFromStorage(authedUserKey);
    this.authedUser = null;
    this.router.navigateByUrl("/");
    console.log("Logged out");
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
