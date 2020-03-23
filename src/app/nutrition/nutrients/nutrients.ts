import { Minerals } from '../impl/minerals';
import { Vitamins } from '../impl/vitamins';
import { Protein } from '../impl/protein';
import { Sex } from '../../users/sex';
import { User } from '../../users/user';
import { Lipids } from '../impl/lipids';
import { IIntakeRecommendation } from '../i-intake-recommendation';
import { Carbohydrates } from '../impl/Carbohydrates';

export class Nutrients implements IIntakeRecommendation {

    public kcal: number;
    public alcohol: number;
    public caffeine: number;
    public water: number;
    public carbs: Carbohydrates;
    public lipids: Lipids;
    public protein: Protein;
    public vitamins: Vitamins;
    public minerals: Minerals;


    public getMinimum(user: User) : Nutrients {
        let nutri: Nutrients = new Nutrients();

        nutri.water = user.sex == Sex.Female ? 1.0 : 1.5;
        nutri.carbs = new Carbohydrates();
        

        return nutri;
    }

    public getMaximum(user: User) : Nutrients {
        let nutri: Nutrients = new Nutrients();

        nutri.water = 10;

        return nutri;
    }

    public static getMinimumProtein(user: User) : number { //10-35% of cals
       return user.getRecommendedKcal() * 0.01;
    }

    public static getMaximumProtein(user: User) : number { //10-35% of cals
        return user.getRecommendedKcal() * 0.035;
    }

    public static getMinimumCarbs(user: User) : number { //45-65% of cals
        return user.getRecommendedKcal() * 0.045;
    }

    public static getMaximumCarbs(user: User) : number { //45-65% of cals
        return user.getRecommendedKcal() * 0.065;
    }

    public static getMinimumFat(user: User) : number { //20-35% of cals
        return user.getRecommendedKcal() * 0.02;
    }

    public static getMaximumFat(user: User) : number { //20-35% of cals
        return user.getRecommendedKcal() * 0.035;
    }

    public static getRecommendedOmega6(sex: Sex) : number {
        return sex == Sex.Female ? 12 : 17;
    }

    public static getRecommendedOmega3(sex: Sex) : number {
        return sex == Sex.Female ? 1.1 : 1.6;
    }

    public static getRecommendedCholestrol() : number {
        return 300;
    }

    public static getMaxSugars(user: User) : number {
        return user.getRecommendedKcal() * 0.025;
    }

    public static getMinimumWater(sex: Sex) : number {
        return sex == Sex.Female ? 1 : 1.5;
    }

    public static getRecommendedWater(sex: Sex) : number {
        return sex == Sex.Female ? 2.7 : 3.7;
    }


    public static getMaxCaffeine(user: User) : number { //mg
        return user.pregnant || user.lactating ? 200 : 400;
    }

}