import { Component, OnInit } from '@angular/core';
import { UsersService } from '../service/users.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user';
import { Sex } from '../sex';
import { ActivityLevel } from 'src/app/nutrition/activity-level';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];

  constructor(private route: ActivatedRoute,
    private usersService: UsersService,
    private location: Location) { }

  ngOnInit(): void {
    this.usersService.fetchUsers()
    .subscribe(users => this.users = users);
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
