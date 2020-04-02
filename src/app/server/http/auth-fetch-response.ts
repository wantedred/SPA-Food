import { BasicHttpResponse } from './basic-http-response';
import { AccountState } from 'src/app/users/account-state';
import { ActivityLevel } from 'src/app/nutrition/activity-level';
import { Sex } from 'src/app/users/sex';

export interface AuthFetchResponse extends BasicHttpResponse {
    joinedAt: Date;
    lastActiveAt: Date;
    accountState: AccountState;
    activityLevel: ActivityLevel;
    displayName: string;
    emailAddress: string;
    dob: Date;
    height: number;
    weight: number;
    lactating: boolean;
    pregnant: boolean;
    smoker: boolean;
    sex: Sex;
}