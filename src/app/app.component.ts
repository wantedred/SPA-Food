import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { User } from './users/user';

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

  constructor() { }

  ngOnInit() {
  }

  public isLoggedIn() : boolean {
    return this.user != null;
  }

  public hasInbox() : boolean {
    return this.isLoggedIn() && (this.user.isProfessional || this.user.hasProfessional);
  }

  public isAdmin() : boolean {
    return false;
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }
  
}
