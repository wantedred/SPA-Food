import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../user';
import { AuthenticateService } from '../authenticate/authenticate.service';
import { Router } from '@angular/router';
import { Constants } from 'src/app/constants';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  selectedMenu: string = "details";

  @Output() public sidenavToggle = new EventEmitter();
  @Output() public sidenavClose = new EventEmitter();

  constructor(
    private authService: AuthenticateService,
    private router: Router) { 
      if (!authService.isLoggedIn()) {
        router.navigateByUrl(Constants.loginUrl);
        return;
      }
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
  }

  onMenuSelect(menuName: string) {
    this.selectedMenu = menuName;
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

}
