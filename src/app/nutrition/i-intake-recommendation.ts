import { User } from '../users/user';

export interface IIntakeRecommendation {

    getMinimum(user: User) : any;
    getMaximum(user: User) : any;
    
}