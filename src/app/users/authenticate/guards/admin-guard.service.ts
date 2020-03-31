import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { AuthenticateService } from '../authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate, CanLoad {


  constructor(
    private authService: AuthenticateService) { }

  canLoad() {
    return this.authService.isLoggedIn() && this.authService.authedUser.isAdmin();
  }

  canActivate() {
    return this.canLoad();
  }

}
