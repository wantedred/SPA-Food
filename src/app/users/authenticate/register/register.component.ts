import { Component, OnInit } from '@angular/core';
import { Sex } from 'src/app/users/sex';

import { UsersService } from 'src/app/users/service/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators, AsyncValidator, AbstractControl, ValidationErrors, FormBuilder, ValidatorFn } from '@angular/forms';
import { ActivityLevel } from 'src/app/nutrition/activity-level';
import { User } from 'src/app/users/user';
import { FormFieldBaseValidator } from 'src/app/form-validators/form-field-base-validator';
import { SexName } from 'src/app/admin/users/crud/create/create-user.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  sexNames: SexName[] = [
    {sex: Sex.Male, name: 'Male'},
    {sex: Sex.Female, name: 'Female'},
  ];
  
  show:string = "reg1";
  user:User;

  fieldValidator: FormFieldBaseValidator = new FormFieldBaseValidator();
  createForm:FormGroup;

  constructor(
    private router: Router,
    private usersService: UsersService,
    private location: Location,
    private formBuilder: FormBuilder) { }

    ngOnInit(): void {
      if (this.show == "reg1") {
        this.createForm = this.formBuilder.group({
          displayNameControl: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]),
          emailAddressControl: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(30), Validators.email]),
          passwordControl: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]),
          confirmPasswordControl: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30)
            , this.matchingFieldsValidation("passwordControl", "confirmPasswordControl")]),
        });
      } else if (this.show == "reg2") {
        this.createForm = this.formBuilder.group({
          sexControl: new FormControl('', Validators.required),
          dobControl: new FormControl(new Date(), Validators.required),
        });
      } else {

      }
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
      console.log("Register user");
  
      let displayName:string = this.createForm.controls['displayNameControl'].value;
      let emailAddress:string = this.createForm.controls['emailAddressControl'].value;
      let password:string = this.createForm.controls['passwordControl'].value;
      let confirmPassword:string = this.createForm.controls['confirmPasswordControl'].value;
  
      if (password !== confirmPassword) {
        
      }
      this.user = new User();
      this.user.emailAddress = emailAddress;
      this.user.password = password;
      this.user.displayName = displayName;

      this.show = "reg2";
      this.ngOnInit();
    }

    onRegister(): void {
      let sex:Sex = this.createForm.controls['sexControl'].value;
      let dob:Date = this.createForm.controls['dobControl'].value;

      this.user.sex = sex;
      this.user.dob = dob;
      
      console.warn("Posting user => " + this.user);

      let userResponse:User;

      this.usersService.addUser(this.user).subscribe(newUser => userResponse = newUser);
  
      if (userResponse == null) {
        console.log("invalid user response");
      }
      console.log("done");
      //this.router.navigateByUrl("users/create");
    }
  
    goBack(): void {
      this.location.back();
    }

}
