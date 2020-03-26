import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { UsersService } from '../users/service/users.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FormValidatorService {

  constructor() { }


  fieldsMatch(passwordKey: string, confirmPasswordKey: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      console.log("fieldsMatch => checking");

      if (!control) { 
        console.log("fieldsMatch => no contorl");
        return null; 
      }
      const password = control.get(passwordKey);
      const confirmPassword = control.get(confirmPasswordKey);

      if (!password.value || !confirmPassword.value) {
        console.log("fieldsMatch => not values");
        return null;
      }
      if (password.value !== confirmPassword.value) {
        console.log("fieldsMatch => not same");
        console.log("fieldsMatch => " + password.value);
        console.log("fieldsMatch => " + confirmPassword.value);
        confirmPassword.setErrors({ fieldsMismatch: true });
        return { fieldsMismatch: true };
      }
      console.log("fieldsMatch => good");
      confirmPassword.setErrors(null);
      return null;
    };
  }

  emailAddressExists(controlName: string, usersService: UsersService) : AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
        if (!control) { 
            return null; 
        }
        console.log("emailAddressExists => checking");
  
        return usersService.getUserByEmailAddress(control.value)
            .pipe(map(user => (user ? { emailAddressTaken: true } : null)), catchError(() => of(null)));
    };
    /*return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
  
        if (control.errors && !control.errors.emailAddressTaken) {
            console.log("emailAddressExists => errors");
            return;
        }
        console.log("emailAddressExists => checking");
        return timer(250).subscribe(this.usersService.getUserByEmailAddress(control.value)
            .pipe(map(user => (user ? { emailAddressTaken: true } : null)), catchError(() => of(null))));
    };*/
  }

}
