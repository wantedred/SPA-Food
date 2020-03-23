import { Component, OnInit } from '@angular/core';
import { Sex } from 'src/app/users/sex';

import { UsersService } from 'src/app/users/service/users.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators, AsyncValidator, AbstractControl, ValidationErrors, FormBuilder } from '@angular/forms';
import { ActivityLevel } from 'src/app/nutrition/activity-level';
import { User } from 'src/app/users/user';
import { FormFieldBaseValidator } from 'src/app/form-validators/form-field-base-validator';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  sexes: Sex[] = [Sex.Male, Sex.Female];

  fieldValidator: FormFieldBaseValidator = new FormFieldBaseValidator();
  createForm:FormGroup;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private location: Location,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      displayNameControl: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]),
      emailAddressControl: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(30), Validators.email]),
      passwordControl: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]),
      confirmPasswordControl: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]),
      sexControl: new FormControl('', Validators.required),
      dob: new FormControl(new Date(), Validators.required),
    });
  }

  onSubmit() {
    console.log(this.createForm.controls['displayNameControl']);

    // TODO: Use EventEmitter with form value
    console.warn(this.createForm.value);
  }

  add(name: string): void {
    name = name.trim();

    if (!name) { return; }

    let user: User = new User("email", "pass", name, 1, 1, 2000, Sex.Male, false, false, false, 50, 165, ActivityLevel.Active);

   /* this.usersService.addUser(user)
      .subscribe(user => {
        this.users.push(user);
      });*/
      this.location.go("./users-overview/");
  }

  goBack(): void {
    this.location.back();
  }

}
