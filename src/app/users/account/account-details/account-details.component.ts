import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Sex, sexNames, SexName } from 'src/app/users/sex';

import { UsersService } from 'src/app/users/service/users.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { User } from 'src/app/users/user';
import { FormValidatorService } from 'src/app/form-validators/form-validator.service';
import { FormControlOnChangeValidator } from 'src/app/form-validators/form-on-change-validator';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {

  hidePassword: boolean = true;

  sexNames: SexName[] = sexNames;
  user:User;
  startDate:Date = new Date();
  minDate: Date = new Date();
  maxDate: Date = new Date();

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

  toggleControlState(controlName: string): void {
    if (this.isControlDisabled(controlName)) {
      this.createForm.get(controlName).enable();
      return;
    }
    this.createForm.get(controlName).disable();
  }

  isControlDisabled(controlName: string): boolean {
    return this.createForm.get(controlName).disabled;
  }

  ngOnInit(): void {
    this.createForm = this.formBuilder.group(
      {
        displayNameControl: new FormControl({value: '', disabled: true}
          , [Validators.required, Validators.minLength(3), Validators.maxLength(16)]),
        emailAddressControl: new FormControl({value: '', disabled: true}
          , [Validators.required, Validators.minLength(5), Validators.maxLength(30), Validators.email],
          [this.formValidatorService.emailAddressExists('emailAddressControl', this.usersService)]),
        passwordControl: new FormControl({value: '', disabled: true}
          , [Validators.required, Validators.minLength(6), Validators.maxLength(30)]),
        confirmPasswordControl: new FormControl({value: '', disabled: true}, [Validators.required]),
        sexControl: new FormControl({value: '', disabled: true}, Validators.required),
        dobControl: new FormControl({value: '', disabled: true}, Validators.required),
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

  isFormValid(): boolean {
    if (this.createForm.get('displayNameControl').invalid) {
      console.log("displayNameControl not valid");
      return false;
    }
    if (this.createForm.get('emailAddressControl').invalid) {
      console.log("emailAddressControl not valid");
      return false;
    }
    if (this.createForm.get('passwordControl').invalid) {
      console.log("passwordControl not valid");
      return false;
    }
    if (this.createForm.get('confirmPasswordControl').invalid) {
      console.log("confirmPasswordControl not valid");
      return false;
    }
    if (this.createForm.get('sexControl').invalid) {
      console.log("sexControl not valid");
      return false;
    }
    if (this.createForm.get('dobControl').invalid) {
      console.log("dobControl not valid");
      return false;
    }
    return true;
  }

  onSubmit(): void {
    if (!this.isFormValid()) {
      console.log("Invalid registration form");
      return;
    }
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

      //this.ngOnInit();

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
