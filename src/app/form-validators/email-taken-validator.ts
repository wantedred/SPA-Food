import { AsyncValidator, AbstractControl, ValidationErrors } from '@angular/forms';
import { Injectable } from '@angular/core';
import { UsersService } from '../users/service/users.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class EmailTakenValidator implements AsyncValidator {
    
    constructor(private usersService: UsersService) {}


    validate(ctrl: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
        return this.usersService.getUserByEmailAddress(ctrl.value)
          .pipe(map(user => (user ? { uniqueAlterEgo: true } : null)), catchError(() => of(null)));
    }

}