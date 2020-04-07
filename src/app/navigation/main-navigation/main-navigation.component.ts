import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { AuthenticateService } from 'src/app/users/authenticate/authenticate.service';
import { AccountService } from 'src/app/users/account/account.service';

@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.css']
})
export class MainNavigationComponent implements OnInit {

  title: string = 'Nachtglas';
  selectedIndex: number = -1;
  notifs: Notification[] = [];

  @Output() public sidenavToggle = new EventEmitter();
  @Output() public sidenavClose = new EventEmitter();


  constructor(public authService: AuthenticateService,
    private accService: AccountService) { }

  ngOnInit(): void {
    this.authService.fetchApiVersion();
    
    if (this.authService.isLoggedIn()) {
      this.accService.fetchUser();

      this.accService.fetchNotifications()
        .subscribe(resp => {
          if (!resp.success) {
            console.error(resp.message);
            return;
          }
          this.notifs = resp.notifications;
        }
      );
    }
  }

  public hasNotifications(): boolean {
    return this.notifs.length > 0;
  }

  public hasInbox(): boolean {
    return this.authService.isLoggedIn() && this.authService.authedUser.hasInbox();
  }

  public isAdmin(): boolean {
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
