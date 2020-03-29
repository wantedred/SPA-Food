import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { AuthenticateService } from 'src/app/users/authenticate/authenticate.service';

@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.css']
})
export class MainNavigationComponent implements OnInit {

  title: string = 'Nutri Home Manager';
  selectedIndex:number = -1;

  @Output() public sidenavToggle = new EventEmitter();
  @Output() public sidenavClose = new EventEmitter();


  constructor(private authService: AuthenticateService) { }

  ngOnInit(): void {
  }

  hasInbox(): boolean {
    return this.authService.isLoggedIn() && this.authService.authedUser.hasInbox();
  }

  isAdmin(): boolean {
    return this.authService.isLoggedIn() && this.authService.authedUser.isAdmin();
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

  public setSelectedIndex(selectedIndex: number) {
    this.selectedIndex = selectedIndex;
  }

}
