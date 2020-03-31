import { Injectable } from '@angular/core';
import { AuthenticateService } from '../authenticate.service';
import { CanActivate, CanLoad } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuardService implements CanActivate, CanLoad {


  constructor(
    private authService: AuthenticateService) { }

  canLoad() {
    return this.canActivate();
  }

  canActivate() {
    return !this.authService.isLoggedIn();
  }

}
