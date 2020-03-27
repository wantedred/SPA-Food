import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { User } from './users/user';
import { AccountState } from './users/account-state';
import { ActivityLevel } from './nutrition/activity-level';
import { Sex } from './users/sex';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title: string = 'Nutri Home Manager';
  user: User = null;

  @Output() public sidenavToggle = new EventEmitter();
  @Output() public sidenavClose = new EventEmitter();

  constructor() {
    /*this.user = new User();
    this.user.displayName = "MyDisplayName";
    this.user.dob = new Date();
    this.user.emailAddress = "email@email.com";
    this.user.accountState = AccountState.Administrator;
    this.user.activity = ActivityLevel.Active;
    this.user.hasProfessional = true;
    this.user.isProfessional = true;
    this.user.height = 185;
    this.user.weight = 60;
    this.user.joinedAt = new Date();
    this.user.lastActiveAt = new Date();
    this.user.sex = Sex.Female;
    this.user.password = "password";*/
  }

  ngOnInit() {
  }

  public isLoggedIn() : boolean {
    return this.user != null;
  }

  public hasInbox() : boolean {
    return this.isLoggedIn() && (this.user.isProfessional || this.user.hasProfessional);
  }

  public isAdmin() : boolean {
    return true;
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }
  
}
