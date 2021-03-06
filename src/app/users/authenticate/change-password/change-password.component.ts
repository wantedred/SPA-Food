import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../authenticate.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Constants } from 'src/app/constants';
import { FormControlOnChangeValidator } from 'src/app/form-validators/form-on-change-validator';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormValidatorService } from 'src/app/form-validators/form-validator.service';
import { Location } from '@angular/common';
import { AccountService } from '../../account/account.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  submitErrorMessage: string = null;
  passChanged: boolean = false;
  hidePassword: boolean = true;
  updating: boolean = false;

  onChangeValidator: FormControlOnChangeValidator = new FormControlOnChangeValidator();
  createForm:FormGroup;


  constructor(
    private formValidatorService: FormValidatorService,
    private formBuilder: FormBuilder,
    private authService: AuthenticateService,
    private accService: AccountService,
    private router: Router,
    private location: Location) { 
      if (!this.authService.isLoggedIn()) {
        this.router.navigateByUrl(Constants.loginUrl);
        return;
      }
  }

  ngOnInit(): void {
    this.createForm = this.formBuilder.group(
      {
        currentPasswordControl: new FormControl(''
          , [Validators.required, Validators.minLength(6), Validators.maxLength(30)]),
        passwordControl: new FormControl(''
          , [Validators.required, Validators.minLength(6), Validators.maxLength(30)]),
        confirmPasswordControl: new FormControl('', [Validators.required]),
      }, {
        validators: [
          this.formValidatorService.fieldsMatch("passwordControl", "confirmPasswordControl"),
        ]
      }
    );
  }

  isFormValid(): boolean {
    if (this.createForm.get('currentPasswordControl').invalid) {
      console.log("currentPasswordControl not valid");
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
    return true;
  }

  onSubmit(): void {
    if (!this.isFormValid()) {
      console.log("Invalid change password form");
      return;
    }
    let curPassword: string = this.createForm.controls['currentPasswordControl'].value;
    let password: string = this.createForm.controls['passwordControl'].value;
    let confirmPassword: string = this.createForm.controls['confirmPasswordControl'].value;

    if (password !== confirmPassword) {
      this.submitErrorMessage = "Your new passwords do not match";
      return;
    }
    if (curPassword === password) {
      this.submitErrorMessage = "Your new password is the same as your current one";
      return;
    }
    this.updating = true;

    this.accService.changePassword(curPassword, confirmPassword)
      .subscribe(resp => {
        if (!resp.success) {
          this.submitErrorMessage = resp.message;
          this.updating = false;
          return;
        }
        this.updating = false;
        this.passChanged = true;
      }
    );
  }

  goBack(): void {
    this.location.back();
  }

}
