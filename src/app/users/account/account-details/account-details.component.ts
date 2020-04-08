import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Sex, sexNames, SexName } from 'src/app/users/sex';

import { UsersService } from 'src/app/users/service/users.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { FormValidatorService } from 'src/app/form-validators/form-validator.service';
import { FormControlOnChangeValidator } from 'src/app/form-validators/form-on-change-validator';
import { AuthenticateService } from '../../authenticate/authenticate.service';
import { Constants } from 'src/app/constants';
import { EditField } from 'src/app/form-validators/edit-field';
import { AccountService } from '../account.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountDetailsResponse } from 'src/app/server/http/account-details-response';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {

  confirmationEmailRequested: boolean = false;

  sexNames: SexName[] = sexNames;
  
  startDate:Date = new Date();
  minDate: Date = new Date();
  maxDate: Date = new Date();

  editFields: Array<EditField> = [];

  onChangeValidator: FormControlOnChangeValidator = new FormControlOnChangeValidator();
  createForm:FormGroup;

   constructor(
    private formValidatorService: FormValidatorService,
    private router: Router,
    private accService: AccountService,
    private location: Location,
    private formBuilder: FormBuilder,
    public authService: AuthenticateService,
    private snackBar: MatSnackBar) {
      if (!authService.isLoggedIn()) {
        router.navigateByUrl(Constants.loginUrl);
        return;
      }
      this.startDate.setFullYear(this.startDate.getFullYear() - 18);
      this.minDate.setFullYear(this.startDate.getFullYear() - 120);
      this.maxDate.setFullYear(this.startDate.getFullYear() - 12);
  }

  ngOnInit(): void {
    this.createForm = this.formBuilder.group(
      {
        displayNameControl: new FormControl({value: this.authService.authedUser.displayName, disabled: true}
          , [Validators.required, Validators.minLength(3), Validators.maxLength(16)]),
        emailAddressControl: new FormControl({value: this.authService.authedUser.emailAddress, disabled: true}
          , [Validators.required, Validators.minLength(5), Validators.maxLength(30), Validators.email],
          [this.formValidatorService.emailAddressExists('emailAddressControl', this.authService)]),
        sexControl: new FormControl({value: this.authService.authedUser.sex, disabled: true}, Validators.required),
        dobControl: new FormControl({value: this.authService.authedUser.dob, disabled: true}, Validators.required),
      }, {
        validators: [
          this.formValidatorService.isValidDate("dobControl", this.minDate, this.maxDate)
        ]
      }
    );
    this.editFields.push(new EditField("displayNameControl", this.authService.authedUser.displayName));
    this.editFields.push(new EditField("emailAddressControl", this.authService.authedUser.emailAddress));
    this.editFields.push(new EditField("sexControl", this.authService.authedUser.sex));
    this.editFields.push(new EditField("dobControl", this.authService.authedUser.dob));
  }

  isEmailConfirmed(): boolean {
    return this.authService.authedUser.emailConfirmed;
  }

  requestConfirmationEmail(): void {
    this.accService.requestConfirmationEmail().subscribe(resp => {
      this.confirmationEmailRequested = resp.success;

      let snackbarRef = this.snackBar.open(!resp.success ? resp.message : "Confirmation email has been sent", "Dismiss", {
        duration: 5000,
      });
      snackbarRef.afterDismissed().subscribe(() => {
        console.log('The snack-bar was dismissed');
      });
      snackbarRef.onAction().subscribe(() => {
        console.log('The snack-bar action was triggered!');
      });
    });
  }

  getEditFieldIcon(controlName: string): string {
    return this.editFields.find(x => x.controlName == controlName).icon;
  }

  onEditModeChange(controlName: string): void {
    let ef:EditField = this.editFields.find(x => x.controlName == controlName);

    ef.toggleEditMode();

    if (this.isControlDisabled(controlName)) {
      console.log(controlName + " is not in edit mode");
      return;
    }
    console.log("On edit mode change for " + controlName);

    let newValue: any = this.createForm.get(controlName).value;

    if (ef.value != newValue) {
      let detailsUpdate: boolean = true;
      let accDetailsResp: AccountDetailsResponse = new AccountDetailsResponse();
      accDetailsResp.LoadFromUser(this.authService.authedUser);

      switch (controlName) {
        case "displayNameControl":
          accDetailsResp.displayName = newValue;

          break;

        case "emailAddressControl":
          detailsUpdate = false;

          this.accService.changeEmail(newValue).then(resp => {
            let snackbarRef = this.snackBar.open(resp != null ? resp : "Email successfully updated", "Dismiss", {
              duration: 5000,
            });
            snackbarRef.afterDismissed().subscribe(() => {
              console.log('The snack-bar was dismissed');
            });
            snackbarRef.onAction().subscribe(() => {
              console.log('The snack-bar action was triggered!');
            });
            this.createForm.get(controlName).patchValue(this.authService.authedUser.emailAddress);
          });
          break;
          
        case "sexControl":
          this.authService.authedUser.sex = newValue;
          break;
          
        case "dobControl":
          this.authService.authedUser.dob = newValue;
          break;
      }
      if (detailsUpdate) {
        ef.value = newValue;

        this.accService.changeDetails(accDetailsResp).then(resp => {
          if (resp != null) {
            let snackbarRef = this.snackBar.open(resp, "Dismiss", {
              duration: 5000,
            });
            snackbarRef.afterDismissed().subscribe(() => {
              console.log('The snack-bar was dismissed');
            });
            snackbarRef.onAction().subscribe(() => {
              console.log('The snack-bar action was triggered!');
            });
            return;
          }
          this.accService.fetchUser().then(resp => {
            if (resp != null) {
              console.error(resp);
              return;
            }
            this.createForm.get(ef.controlName).patchValue(ef.value);
          });
        });
      }
    }
    ef.value = newValue;
  }
  
  toggleControlState(controlName: string): void {
    this.onEditModeChange(controlName);

    if (this.isControlDisabled(controlName)) {
      this.createForm.get(controlName).enable();
      return;
    }
    this.createForm.get(controlName).disable();
  }

  isControlDisabled(controlName: string): boolean {
    return this.createForm.get(controlName).disabled;
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

  goBack(): void {
    this.location.back();
  }

}
