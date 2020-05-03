import { BasicHttpResponse } from './basic-http-response';
import { ActivityLevel } from 'src/app/nutrition/activity-level';
import { Sex } from 'src/app/users/sex';

export interface AuthFetchResponse extends BasicHttpResponse {
    joinedAt: Date;
    lastActiveAt: Date;
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
    roles: string[];
}