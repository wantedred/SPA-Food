import { Component, OnInit } from '@angular/core';
import { Sex } from 'src/app/users/sex';

import { UsersService } from 'src/app/users/service/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators, AsyncValidator, AbstractControl, ValidationErrors, FormBuilder, ValidatorFn } from '@angular/forms';
import { ActivityLevel } from 'src/app/nutrition/activity-level';
import { User } from 'src/app/users/user';
import { FormFieldBaseValidator } from 'src/app/form-validators/form-field-base-validator';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  sexNames: SexName[] = [
    {sex: Sex.Male, name: 'Male'},
    {sex: Sex.Female, name: 'Female'},
  ];

  fieldValidator: FormFieldBaseValidator = new FormFieldBaseValidator();
  createForm:FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService,
    private location: Location,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      displayNameControl: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]),
      emailAddressControl: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(30), Validators.email]),
      passwordControl: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]),
      confirmPasswordControl: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30)
        , this.matchingFieldsValidation("passwordControl", "confirmPasswordControl")]),
      sexControl: new FormControl('', Validators.required),
      dobControl: new FormControl(new Date(), Validators.required),
    });
  }

  matchingFieldsValidation(firstControlName: string, secondControlName: string): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
        const firstControl= control.get(firstControlName);
        const secondControl= control.get(secondControlName);
        if (!firstControl || !secondControl) return null;
        return JSON.stringify(firstControl.value) === JSON.stringify(secondControl.value) ? null : {matchingFields: true};
        //return firstControl.value == secondControl.value ? null : {matchingFields: true}
    }
  }

  onSubmit(): void {
    console.log("Posting user");

    let displayName:string = this.createForm.controls['displayNameControl'].value;
    let emailAddress:string = this.createForm.controls['emailAddressControl'].value;
    let password:string = this.createForm.controls['passwordControl'].value;
    let confirmPassword:string = this.createForm.controls['confirmPasswordControl'].value;
    let sex:Sex = this.createForm.controls['sexControl'].value;
    let dob:Date = this.createForm.controls['dobControl'].value;

    if (password !== confirmPassword) {
      
    }
    let user:User = new User();
    user.displayName = displayName;
    user.emailAddress = emailAddress;
    user.password = password;
    user.sex = sex;
    user.dob = dob;

    console.warn("Posting user => " + user);

    let userResponse:User = null;

    this.usersService.addUser(user).subscribe(newUser => userResponse = newUser);

    if (userResponse == null) {
      console.log("invalid user response");
    }
    this.router.navigateByUrl("users/create");
  }

  goBack(): void {
    this.location.back();
  }

}
export interface SexName {
  sex: Sex;
  name: string;
}
