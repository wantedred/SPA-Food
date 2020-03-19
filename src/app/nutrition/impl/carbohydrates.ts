import { Sugars } from './sugars';
import { ICountable } from '../i-countable';
import { IIntakeRecommendation } from '../i-intake-recommendation';
import { User } from 'src/app/users/user';
import { Sex } from 'src/app/users/sex';

export class Carbohydrates implements ICountable, IIntakeRecommendation {

    public fiber: number;
    public starch: number;
    public sugars: Sugars;
    public addedSugars: number;
    public sugarAlcohol: number;


    public getNetCarbs(): number {
        return 0;
    }

    public getTotalSugars(): number {
        return this.sugars.getTotalCount() + this.addedSugars + this.sugarAlcohol;
    }

    public getMinimum(user: User) : Carbohydrates {
        let carbs: Carbohydrates = new Carbohydrates();

        carbs.starch = 0;
        carbs.sugars = new Sugars(user.getRecommendedKcal() * 0.05);
        carbs.addedSugars = 0;
        carbs.sugarAlcohol = 0;

        if (user.getAge() < 4) {
            carbs.fiber = 14;

        } else if (user.getAge() < 9) {
            carbs.fiber =  user.sex == Sex.Female ? 16.8 : 19.6;

        } else if (user.getAge() < 14) {
            carbs.fiber =  user.sex == Sex.Female ? 22.4 : 25.2;

        } else if (user.getAge() < 19) {
            carbs.fiber =  user.sex == Sex.Female ? 25.2 : 30.8;

        } else {
            carbs.fiber =  user.sex == Sex.Female ? 25 : 38;
        }
        return carbs;
    }

    public getMaximum(user: User) : Carbohydrates {
        let carbs: Carbohydrates = new Carbohydrates();

        carbs.fiber = 0;
        carbs.starch = 0;
        carbs.sugars = new Sugars(user.getRecommendedKcal() * 0.1);
        carbs.addedSugars = 0;
        carbs.sugarAlcohol = 0;

        return carbs;
    } 

    public getTotalCount(): number {
        return this.fiber + this.starch + this.sugars.getTotalCount() + this.addedSugars + this.sugarAlcohol;
    }

}