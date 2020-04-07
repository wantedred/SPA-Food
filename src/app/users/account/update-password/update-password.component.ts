import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../../authenticate/authenticate.service';
import { AccountService } from '../account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from 'src/app/constants';
import { FormControlOnChangeValidator } from 'src/app/form-validators/form-on-change-validator';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FormValidatorService } from 'src/app/form-validators/form-validator.service';
import { AuthHttpResponse } from 'src/app/server/http/auth-http-response';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  resetToken: string = null;
  username: string = null;

  allowed: boolean = true;
  expired: boolean = false;
  errorMessage: string = null;
  updating: boolean = false;
  passChanged: boolean = false;
  hidePassword: boolean = true;

  onChangeValidator: FormControlOnChangeValidator = new FormControlOnChangeValidator();
  createForm:FormGroup;

  constructor(
    private formValidatorService: FormValidatorService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthenticateService,
    private accService: AccountService,
    private router: Router) {
    if (authService.isLoggedIn()) {
      this.router.navigateByUrl("/");
      return;
    }
    this.route.queryParams.subscribe(params => {
      this.resetToken = params['rt'];
      this.username = params['u'];
    });
    if (this.resetToken == null || this.resetToken == "" || this.username == null || this.username == "") {
      this.router.navigateByUrl("/");
      return;
    }
    this.resetToken = decodeURIComponent(this.resetToken);
    this.username = decodeURIComponent(this.username);
   }

  ngOnInit(): void {
    this.createForm = this.formBuilder.group(
      {
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
    if (!this.allowed || this.expired) {
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
      console.log("Invalid update password form");
      return;
    }
    this.errorMessage = null;

    let password: string = this.createForm.controls['passwordControl'].value;
    let confirmPassword: string = this.createForm.controls['confirmPasswordControl'].value;

    if (password !== confirmPassword) {
      this.errorMessage = "Your new passwords do not match";
      return;
    }
    this.updating = true;

    this.accService.updatePassword(this.username, password, this.resetToken)
      .subscribe(resp => {
        if (!resp.success) {
          this.errorMessage = resp.message;
          this.updating = false;
          return;
        }
        this.updating = false;
        this.passChanged = true;
      }
    );
  }
}
