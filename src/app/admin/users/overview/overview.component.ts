import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { User } from 'src/app/users/user';
import { Sex } from 'src/app/users/sex';
import { ActivityLevel } from 'src/app/nutrition/activity-level';
import { UsersService } from 'src/app/users/service/users.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class OverviewComponent implements OnInit, AfterViewInit {

  user:User = new User("myemail@example.com", "mypassword", "mydisplayname",
    1, 1, 2000, Sex.Female, false, false, false, 55, 168, ActivityLevel.Active);
  user2:User = new User("msecond@example.com", "mypassword", "secondguy",
    1, 1, 2000, Sex.Female, false, false, false, 55, 168, ActivityLevel.Active);

  FAKE_USERS_DATA: User[] = [
    this.user,this.user2,this.user,this.user2,this.user,this.user2,this.user,this.user2,this.user,this.user2,this.user,this.user2,this.user,
    this.user2,this.user,this.user2,this.user,this.user2,this.user,this.user2,this.user,this.user2,this.user,this.user2,this.user,
    this.user2,this.user,this.user2,this.user,this.user2,this.user,this.user2,this.user,this.user2,this.user,this.user2
  ];

  users: User[] = [];

  columnNames: string[] = ['id', 'dob', 'email', 'displayName'];
  expandedElement: User | null;

  resultsLength = 0;
  isLoadingResults = true;
  isHasNoResults = false;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  data: MatTableDataSource<User> = null;

  public constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private location: Location) { }

  ngOnInit(): void {
    this.usersService.fetchUsers().subscribe(users => this.users = users);
    this.users = this.FAKE_USERS_DATA; //TODO

    this.user.id = 1;
    this.user2.id = 2;

    this.isLoadingResults = false;
    this.isHasNoResults = this.users.length == 0;
    this.resultsLength = this.users.length;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data.filter = filterValue.trim().toLowerCase();

    if (this.data.paginator) {
      this.data.paginator.firstPage();
    }
  }

  ngAfterViewInit() {
    // If the user changes the sort order, reset back to the first page.
    this.data = new MatTableDataSource(this.users);
    this.data.paginator = this.paginator;
    this.data.sort = this.sort;
  }

  delete(user: User): void {
    this.users = this.users.filter(u => u !== user);
    this.usersService.deleteUser(user).subscribe();
  }

  add(name: string): void {
    name = name.trim();

    if (!name) { return; }

    let user: User = new User("email", "pass", name, 1, 1, 2000, Sex.Male, false, false, false, 50, 165, ActivityLevel.Active);

    this.usersService.addUser(user)
      .subscribe(user => {
        this.users.push(user);
      });
  }
}
