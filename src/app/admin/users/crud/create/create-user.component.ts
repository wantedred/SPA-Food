import { Component, OnInit } from '@angular/core';
import { Sex } from 'src/app/users/sex';

import { UsersService } from 'src/app/users/service/users.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  sexes: Sex[] = [Sex.Male, Sex.Female];

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private location: Location) { }

  ngOnInit(): void {
  }

}
