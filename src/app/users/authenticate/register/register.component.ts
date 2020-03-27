import { Component, OnInit } from '@angular/core';
import { Sex, sexNames, SexName } from 'src/app/users/sex';

import { UsersService } from 'src/app/users/service/users.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { User } from 'src/app/users/user';
import { FormValidatorService } from 'src/app/form-validators/form-validator.service';
import { FormControlOnChangeValidator } from 'src/app/form-validators/form-on-change-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  sexNames: SexName[] = sexNames;
  
  step:string = "1";
  user:User;
  startDate:Date = new Date();
  minDate: Date = new Date();
  maxDate: Date = new Date();

  submitErrorMessage: string = null;

  onChangeValidator: FormControlOnChangeValidator = new FormControlOnChangeValidator();
  createForm:FormGroup;

  constructor(
    private formValidatorService: FormValidatorService,
    private router: Router,
    private usersService: UsersService,
    private location: Location,
    private formBuilder: FormBuilder) { 
      this.startDate.setFullYear(this.startDate.getFullYear() - 18);
      this.minDate.setFullYear(this.startDate.getFullYear() - 120);
      this.maxDate.setFullYear(this.startDate.getFullYear() - 12);
    }

    ngOnInit(): void {
      this.createForm = this.formBuilder.group(
        {
          displayNameControl: new FormControl(''
            , [Validators.required, Validators.minLength(3), Validators.maxLength(16)]),
          emailAddressControl: new FormControl(''
            , [Validators.required, Validators.minLength(5), Validators.maxLength(30), Validators.email],
            [this.formValidatorService.emailAddressExists('emailAddressControl', this.usersService)]),
          passwordControl: new FormControl(''
            , [Validators.required, Validators.minLength(6), Validators.maxLength(30)]),
          confirmPasswordControl: new FormControl('', [Validators.required]),
          sexControl: new FormControl('', Validators.required),
          dobControl: new FormControl('', Validators.required),
        }, {
          validators: [
            this.formValidatorService.fieldsMatch("passwordControl", "confirmPasswordControl"),
            this.formValidatorService.isValidDate("dobControl", this.minDate, this.maxDate)
          ]
        }
      );
    }

    isEmailAddressTaken(): boolean {
      return this.createForm.get('emailAddressControl').hasError('emailAddressTaken');
    }

    isFemale(): boolean {
      let sexControl = this.createForm.get('sexControl');

      if (sexControl.hasError('required')) {
        return false;
      }
      let sex:Sex = sexControl.value;
      return sex == Sex.Female;
    }

    isFormValid(): string {
      this.submitErrorMessage = null;

      if (this.step == "1") {
        if (this.createForm.get('displayNameControl').invalid) {
          return "Your display name is invalid";
        }
        if (this.createForm.get('emailAddressControl').invalid) {
          return "Your email address is invalid";
        }
        if (this.createForm.get('passwordControl').invalid) {
          return "Your password is invalid";
        }
        if (this.createForm.get('confirmPasswordControl').invalid) {
          return "Please password confirm is invalid";
        }
      } else if (this.step == "2") {
        if (this.createForm.get('sexControl').invalid) {
          return "Your sex is invalid";
        }
        if (this.createForm.get('dobControl').invalid) {
          return "Your date of birth is invalid";
        }
      }
      return null;
    }

    onSubmit(): void {
      this.submitErrorMessage = this.isFormValid();

      if (this.submitErrorMessage != null) {
        return;
      }
      if (this.step == "1") {
        console.log("Submit Form Values" + JSON.stringify(this.createForm.value));

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

        this.step = "2";
        //this.ngOnInit();
        return;
      }
      if (this.user == null) {
        this.submitErrorMessage = "No user instance defined.";
        return;
      }
      if (this.step == "2") {
        console.log("Register Form Values" + JSON.stringify(this.createForm.value));

        let sex:Sex = this.createForm.controls['sexControl'].value;
        let dob:Date = this.createForm.controls['dobControl'].value;

        this.user.sex = sex;
        this.user.dob = dob;

        console.warn("Posting user => " + this.user);

        let userResponse:User;

        this.usersService.addUser(this.user).subscribe(newUser => userResponse = newUser);
    
        if (userResponse == null) {
          this.submitErrorMessage = "Server failed to respond, try again.";
          return;
        }
        this.step = "3";
        return;
      }
      if (this.step == "3") {

      }
      //this.router.navigateByUrl("users/create");
    }
  
    goBack(): void {
      this.location.back();
    }

}
