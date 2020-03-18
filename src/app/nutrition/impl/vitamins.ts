import { IIntakeRecommendation } from '../i-intake-recommendation';
import { Sex } from 'src/app/users/sex';
import { User } from 'src/app/users/user';

export class Vitamins implements IIntakeRecommendation {

    public b1: number; //mg Thiamin
    public b2: number; //mg Riboflavin
    public b3: number; //mg Niacin
    public b5: number; //mg Pantothenic Acid
    public b6: number; //mg Pyridoxine
    public b12: number; //µg Cobalamin
    public biotin: number; //µg B7
    public choline: number; //mg
    public folate: number; //µg B9
    public vitaminA: number; //µg
    public vitaminC: number; //mg
    public vitaminD: number; //μg
    public vitaminE: number; //mg
    public vitaminK: number; //µg


    public getMinimum(user: User): Vitamins {
        let vits: Vitamins = new Vitamins();

        if (user.getAge() <= 1) {
            let months: number = user.getAgeInMonths();

            vits.b1 = months < 7 ? 0.2 : 0.3;
            vits.b2 = months < 7 ? 0.3 : 0.4;
            vits.b3 = months < 7 ? 2 : 4;
            vits.b5 = months < 7 ? 1.7 : 1.8;
            vits.b6 = months < 7 ? 0.1 : 0.3;
            vits.b12 = months < 7 ? 0.4 : 0.5;
            vits.biotin = months < 7 ? 5 : 6;
            vits.choline = months < 7 ? 125 : 150;
            vits.folate = months < 7 ? 65 : 80;
            vits.vitaminA = months < 7 ? 400 : 500;
            vits.vitaminC = months < 7 ? 40 : 50;
            vits.vitaminD = 10;
            vits.vitaminE = months < 7 ? 4 : 5;
            vits.vitaminK = months < 7 ? 2.0 : 2.5;

        } else if (user.getAge() < 4) {
            vits.b1 = 0.5;
            vits.b2 = 0.5;
            vits.b3 = 6;
            vits.b5 = 2;
            vits.b6 = 0.5;
            vits.b12 = 0.9;
            vits.biotin = 8;
            vits.choline = 200;
            vits.folate = 150;
            vits.vitaminA = 300;
            vits.vitaminC = 15;
            vits.vitaminD = 15;
            vits.vitaminE = 6;
            vits.vitaminK = 30;

        } else if (user.getAge() < 9) {
            vits.b1 = 0.6;
            vits.b2 = 0.6;
            vits.b3 = 8;
            vits.b5 = 3;
            vits.b6 = 0.6;
            vits.b12 = 1.2;
            vits.biotin = 12;
            vits.choline = 250;
            vits.folate = 200;
            vits.vitaminA = 400;
            vits.vitaminC = 25;
            vits.vitaminD = 15;
            vits.vitaminE = 7;
            vits.vitaminK = 55;

        } else if (user.getAge() < 14) {
            vits.b1 = 0.9;
            vits.b2 = 0.9;
            vits.b3 = 12;
            vits.b5 = 4;
            vits.b6 = 1.0;
            vits.b12 = 1.8;
            vits.biotin = 20;
            vits.choline = 375;
            vits.folate = 300;
            vits.vitaminA = 600;
            vits.vitaminC = 45;
            vits.vitaminD = 15;
            vits.vitaminE = 11;
            vits.vitaminK = 60;

        } else if (user.getAge() < 19) {
            vits.b1 = user.sex == Sex.Female ? 1.0 : 1.2;
            vits.b2 = user.sex == Sex.Female ? 1.0 : 1.3;
            vits.b3 = user.sex == Sex.Female ? 14 : 16;
            vits.b5 = 5;
            vits.b6 = user.sex == Sex.Female ? 1.2 : 1.3;
            vits.b12 = 2.4;
            vits.biotin = 25;
            vits.choline = user.sex == Sex.Female ? 400 : 550;
            vits.folate = 400;
            vits.vitaminA = user.sex == Sex.Female ? 700 : 900;
            vits.vitaminC = user.sex == Sex.Female ? 65 : 75;
            vits.vitaminD = 15;
            vits.vitaminE = 15;
            vits.vitaminK = 75;
            
            if (user.pregnant || user.lactating) {
                vits.b1 = 1.4;
                vits.b2 = user.lactating ? 1.6 : 1.4;
                vits.b3 = user.lactating ? 17 : 18;
                vits.b5 = user.lactating ? 7 : 6;
                vits.b6 = user.lactating ? 2.0 : 1.9;
                vits.b12 = user.lactating ? 2.8 : 2.6;
                vits.biotin = user.lactating ? 35 : 30;
                vits.choline = user.lactating ? 550 : 450;
                vits.folate = user.lactating ? 600 : 500;
                vits.vitaminA = user.lactating ? 1200 : 750;
                vits.vitaminC = user.lactating ? 115 : 80;
                vits.vitaminD = 15;
                vits.vitaminE = user.lactating ? 19 : 15;
                vits.vitaminK = 75;
            }
        } else if (user.getAge() < 51) {
            vits.b1 = user.sex == Sex.Female ? 1.1 : 1.2;
            vits.b2 = user.sex == Sex.Female ? 1.1 : 1.3;
            vits.b3 = user.sex == Sex.Female ? 14 : 16;
            vits.b5 = 5;
            vits.b6 = 1.3;
            vits.b12 = 2.4;
            vits.biotin = 30;
            vits.choline = user.sex == Sex.Female ? 425 : 550;
            vits.folate = 400;
            vits.vitaminA = user.sex == Sex.Female ? 700 : 900;
            vits.vitaminC = user.sex == Sex.Female ? 75 : 90;
            vits.vitaminD = 15;
            vits.vitaminE = 15;
            vits.vitaminK = user.sex == Sex.Female ? 90 : 120;
            
            if (user.pregnant || user.lactating) {
                vits.b1 = 1.4;
                vits.b2 = user.lactating ? 1.6 : 1.4;
                vits.b3 = user.lactating ? 17 : 18;
                vits.b5 = user.lactating ? 7 : 6;
                vits.b6 = user.lactating ? 2.0 : 1.9;
                vits.b12 = user.lactating ? 2.8 : 2.6;
                vits.biotin = user.lactating ? 35 : 30;
                vits.choline = user.lactating ? 550 : 450;
                vits.folate = user.lactating ? 600 : 500;
                vits.vitaminA = user.lactating ? 1300 : 770;
                vits.vitaminC = user.lactating ? 120 : 85;
                vits.vitaminD = 15;
                vits.vitaminE = user.lactating ? 19 : 15;
                vits.vitaminK = 90;
            }
        } else {
            vits.b1 = user.sex == Sex.Female ? 1.1 : 1.2;
            vits.b2 = user.sex == Sex.Female ? 1.1 : 1.3;
            vits.b3 = user.sex == Sex.Female ? 14 : 16;
            vits.b5 = 5;
            vits.b6 = user.sex == Sex.Female ? 1.5 : 1.7;
            vits.b12 = 2.4;
            vits.biotin = 30;
            vits.choline = user.sex == Sex.Female ? 425 : 550;
            vits.folate = 400;
            vits.vitaminA = user.sex == Sex.Female ? 700 : 900;
            vits.vitaminC = user.sex == Sex.Female ? 75 : 90;
            vits.vitaminD = user.getAge() > 70 ? 20 : 15;
            vits.vitaminE = 15;
            vits.vitaminK = user.sex == Sex.Female ? 90 : 120;
        }
        if (user.smoker) {
            vits.vitaminC += 35;
        }
        return vits;
    }

    public getMaximum(user: User): Vitamins {
        let vits: Vitamins = new Vitamins();

        vits.b1 = 0;
        vits.b2 = 0;
        vits.b3 = 35;
        vits.b5 = 0;
        vits.b6 = 100;
        vits.b12 = 0;
        vits.biotin = 0;
        vits.choline = 3500;
        vits.folate = 1000;
        vits.vitaminA = 3000;
        vits.vitaminC = 2000;
        vits.vitaminD = 130;
        vits.vitaminE = 1000;
        vits.vitaminK = 0;

        return vits;
    }

}

