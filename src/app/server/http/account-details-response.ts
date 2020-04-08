import { Sex } from 'src/app/users/sex';
import { ActivityLevel } from 'src/app/nutrition/activity-level';
import { User } from 'src/app/users/user';

export class AccountDetailsResponse {

    emailAddress: string;
    dob: Date;
    sex: Sex;
    isPregnant: boolean;
    isLactating: boolean;
    isSmoker: boolean;
    weight: number;
    height: number;
    activityLevel: ActivityLevel;
    displayName: string;


    public LoadFromUser(user: User): void {
        this.emailAddress = user.emailAddress;
        this.dob = user.dob;
        this.sex = user.sex;
        this.isPregnant = user.pregnant;
        this.isLactating = user.lactating;
        this.isSmoker = user.smoker;
        this.weight = user.weight;
        this.height = user.height;
        this.activityLevel = user.activity;
        this.displayName = user.displayName;
    }

}