import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { User } from 'src/app/users/user';
import { UsersService } from 'src/app/users/service/users.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-users-overview',
  templateUrl: './users-overview.component.html',
  styleUrls: ['./users-overview.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UsersOverviewComponent implements OnInit, AfterViewInit {

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
    private usersService: UsersService,
    private location: Location) { }

  ngOnInit(): void {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data.filter = filterValue.trim().toLowerCase();

    if (this.data.paginator) {
      this.data.paginator.firstPage();
    }
  }

  ngAfterViewInit() {
    this.usersService.fetchUsers().subscribe(users => {
      this.users = users;
      this.isLoadingResults = false;
      this.isHasNoResults = this.users.length == 0;
      this.resultsLength = this.users.length;
      this.data = new MatTableDataSource(this.users);
      this.data.paginator = this.paginator;
      this.data.sort = this.sort;
    });
  }

  delete(user: User): void {
    this.users = this.users.filter(u => u !== user);
    this.usersService.deleteUser(user).subscribe();
  }

  goBack(): void {
    this.location.back();
  }
}
