import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AccountService } from '../account.service';
import { FormControlOnChangeValidator } from 'src/app/form-validators/form-on-change-validator';

@Component({
  selector: 'app-account-recovery',
  templateUrl: './account-recovery.component.html',
  styleUrls: ['./account-recovery.component.css']
})
export class AccountRecoveryComponent implements OnInit {

  updating: boolean = false;
  passChanged: boolean = false;
  submitErrorMessage: string = null;

  onChangeValidator: FormControlOnChangeValidator = new FormControlOnChangeValidator();
  createForm:FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private accService: AccountService) { }

  ngOnInit(): void {
    this.createForm = this.formBuilder.group(
      {
        emailAddressControl: new FormControl(''
        , [Validators.required, Validators.minLength(5), Validators.maxLength(30), Validators.email]),
      }
    );
  }

  isFormValid(): boolean {
    if (this.createForm.get('emailAddressControl').invalid) {
      console.log("emailAddressControl not valid");
      return false;
    }
    return true;
  }

  onSubmit(): void {
    if (!this.isFormValid()) {
      console.log("Invalid account recovery form");
      return;
    }
    this.submitErrorMessage = null;
    let emailAddress:string = this.createForm.controls['emailAddressControl'].value;

    this.updating = true;

    this.accService.accountRecoveryRequest(emailAddress)
      .subscribe(resp => {
        if (!resp.success) {
          this.submitErrorMessage = resp.message;
          this.updating = false;
          return;
        }
        localStorage.setItem("reset-token", resp.resetToken);
        localStorage.setItem("username", resp.username);
        this.updating = false;
        this.passChanged = true;
        return;
      }
    );
  }

}
