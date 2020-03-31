import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { AuthenticateService } from '../authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanLoad {


  constructor(
    private authService: AuthenticateService,
    private router: Router) { }

  canLoad() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigateByUrl("/auth/login");
    }
    return this.authService.isLoggedIn();
  }

  canActivate() {
    return this.canLoad();
  }

}
