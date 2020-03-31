import { Component, OnInit } from '@angular/core';
import { Sex, sexNames, SexName } from 'src/app/users/sex';

import { UsersService } from 'src/app/users/service/users.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { User } from 'src/app/users/user';
import { FormValidatorService } from 'src/app/form-validators/form-validator.service';
import { FormControlOnChangeValidator } from 'src/app/form-validators/form-on-change-validator';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Constants } from 'src/app/constants';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthenticateService } from '../authenticate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  jsonHeaders = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  public user: User;
  loggedIn : boolean = false;
  
  onChangeValidator: FormControlOnChangeValidator = new FormControlOnChangeValidator();
  createForm:FormGroup;

  constructor(
    private http: HttpClient,
    private formValidatorService: FormValidatorService,
    private router: Router,
    private usersService: UsersService,
    private location: Location,
    private formBuilder: FormBuilder,
    private authService: AuthenticateService) { 
      if (authService.isLoggedIn()) {
        router.navigateByUrl(authService.authedUser.lastRoute);
      }
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
          dobControl: new FormControl(new Date(), Validators.required),
        }, {
          validators: [this.formValidatorService.fieldsMatch("passwordControl", "confirmPasswordControl")]
        }
      );
    }

    isEmailAddressTaken(): boolean {
      return this.createForm.get('emailAddressControl').hasError('emailAddressTaken');
    }

    isFormValid(): boolean {
      if (this.createForm.get('emailAddressControl').invalid) {
        console.log("emailAddressControl not valid");
        return false;
      }
      if (this.createForm.get('passwordControl').invalid) {
        console.log("passwordControl not valid");
        return false;
      }
      return true;
    }

    onSubmit(): void {
      if (!this.isFormValid()) {
        console.log("Invalid registration form");
        return;
      }
      console.log("Logging in");
      
      let emailAddress:string = this.createForm.controls['emailAddressControl'].value;
      let password:string = this.createForm.controls['passwordControl'].value;
      
      this.login(emailAddress, password);
    }
  
    goBack(): void {
      this.location.back();
    }

    public login(email: string, password: string) : Observable<User> {
      return this.http.post<User>(Constants.loginUrl,
        JSON.stringify({email, password}), this.jsonHeaders
      ).pipe(tap(data => {
        console.log("making request to get user logged in!");
        if (localStorage.getItem('currentUser')) {
          localStorage.removeItem('currentUser');
        }
        this.user = data;
        console.log("current user email: " + this.user.emailAddress);
        localStorage.setItem('currentUser', JSON.stringify(this.user));
        this.loggedIn = true;
        this.router.navigateByUrl("/");
      }));
    }

}
