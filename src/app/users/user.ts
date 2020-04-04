import { Sex } from './sex';
import { ActivityLevel } from '../nutrition/activity-level';
import { AccountState } from './account-state';
import { BmiLevel } from 'src/app/nutrition/bmi-level';

export class User {

    public id: number;
    public emailAddress: string;
    public password: string;
    public displayName: string;
    public dob: Date = new Date();
    public joinedAt: Date = new Date();
    public lastActiveAt: Date = new Date();
    public sex: Sex = Sex.Female;
    public pregnant: boolean = false;
    public lactating: boolean = false;
    public smoker: boolean = false;
    public weight: number = 50;
    public height: number = 165;
    public activity: ActivityLevel = ActivityLevel.Active;
    public accountState: AccountState = AccountState.Member;
    public hasProfessional: boolean = false;
    public isProfessional: boolean = false;
    public emailConfirmed: boolean = false;
    public lastRoute: string = "/";


    public hasInbox(): boolean {
        return this.hasProfessional || this.isProfessional;
    }

    public isAdmin(): boolean {
        return this.accountState == AccountState.Administrator;
    }

    public isFemale(): boolean {
        return this.sex == Sex.Female;
    }

    public getBmiLevel() : BmiLevel {
        let bmi: number = this.getBmi();

        if (bmi < 16) {
            return BmiLevel.SevereThinness;
        }
        if (bmi < 17) {
            return BmiLevel.ModerateThinness;
        }
        if (bmi < 18.5) {
            return BmiLevel.MildThinness;
        }
        if (bmi < 25) {
            return BmiLevel.Normal;
        }
        if (bmi < 30) {
            return BmiLevel.Overweight;
        }
        if (bmi < 35) {
            return BmiLevel.ObeseClass1;
        }
        if (bmi < 40) {
            return BmiLevel.ObeseClass2;
        }
        return BmiLevel.ObeseClass3;
    }

    public getBmi() : number {
        return this.weight / (((this.height / 100) * (this.height / 100)));
    }

    public getBmr() : number {
        return (10 * this.weight) + (6.25 * this.height) - (5 * this.getAge()) + (this.sex == Sex.Female ? -161 : 5);
    }

    public getRecommendedKcal() : number {
        let multiplier: number = 1.2;

        switch (this.activity) {
            case ActivityLevel.Bedridden:
                multiplier = 1.2;
                break;
            case ActivityLevel.Sedentary:
                multiplier = 1.3;
                break;
            case ActivityLevel.LittleActivity:
                multiplier = 1.4;
                break;
            case ActivityLevel.LowActivity:
                multiplier = 1.5;
                break;
            case ActivityLevel.Active:
                multiplier = 1.6;
                break;
            case ActivityLevel.VeryActive:
                multiplier = 1.7;
                break;
            case ActivityLevel.Intense:
                multiplier = 1.8;
                break;
            case ActivityLevel.VeryIntense:
                multiplier = 1.9;
                break;
        }
        return this.getBmr() * multiplier;
    }

    public getAge(): number {
        return new Date().getFullYear() - this.dob.getFullYear();
    }

    public getAgeInMonths(): number {
        let date: Date = new Date();
        let months = 0;

        months = (date.getFullYear() - this.dob.getFullYear()) * 12;
        months -= this.dob.getMonth() + 1;
        months += date.getMonth();

        return months <= 0 ? 0 : months;
    }

}