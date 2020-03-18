import { IIntakeRecommendation } from '../i-intake-recommendation';
import { Sex } from 'src/app/users/sex';
import { User } from 'src/app/users/user';

export class Minerals implements IIntakeRecommendation {

    public boron: number; //mg
    public calcium: number; //mg
    public chromium: number; //mcg
    public chloride: number; //mg
    public copper: number; //mg
    public fluoride: number; //mg
    public iodine: number; //mcg
    public iron: number; //mg
    public magnesium: number; //mg
    public manganese: number; //mg
    public molybdenum: number; //mcg
    public nickel: number; //mg
    public phosphorus: number; //mg
    public potassium: number; //mg
    public selenium: number; //mcg
    public sodium: number; //mg
    public vanadium: number; //mg
    public zinc: number; //mg


    public getMinimum(user: User): Minerals {
        let mirs: Minerals = new Minerals();

        mirs.boron = 1;
        mirs.nickel = 0;

        mirs.chloride = 2300;

        if (user.getAge() >= 50 && user.getAge() < 70) {
            mirs.chloride = 2000;

        } else if (user.getAge() >= 70) {
            mirs.chloride = 1800;
        }
        mirs.fluoride = user.sex == Sex.Female ? 3 : 4;
        
        mirs.selenium = 55;
        mirs.sodium = 1500;

        if (user.getAge() >= 51 && user.getAge() < 71) {
            mirs.sodium = 1300;
        } else if (user.getAge() >= 71) {
            mirs.sodium = 1200;
        }
        mirs.vanadium = 0;

        if (user.getAge() <= 1) {
            let months: number = user.getAgeInMonths();

            mirs.calcium = months < 7 ? 200 : 260;
            mirs.chromium = months < 7 ? 0.2 : 5.5;
            mirs.copper = 200;
            mirs.iodine = months < 7 ? 110 : 130;
            mirs.iron = months < 7 ? 0.27 : 11;
            mirs.magnesium = months < 7 ? 30 : 75;
            mirs.manganese = months < 7 ? 0.003 : 0.6;
            mirs.molybdenum = months < 7 ? 2 : 3;
            mirs.phosphorus = months < 7 ? 100 : 275;
            mirs.potassium = months < 7 ? 400 : 860;
            mirs.selenium = months < 7 ? 15 : 20;
            mirs.zinc = months < 7 ? 2 : 3;

        } else if (user.getAge() < 4) {
            mirs.calcium = 700;
            mirs.chromium = 11;
            mirs.copper = 340;
            mirs.iodine = 90;
            mirs.iron = 7;
            mirs.magnesium = 80;
            mirs.manganese = 1.2;
            mirs.molybdenum = 17;
            mirs.phosphorus = 460;
            mirs.potassium = 2000;
            mirs.selenium = 20;
            mirs.zinc = 3;

        } else if (user.getAge() < 9) {
            mirs.calcium = 1000;
            mirs.chromium = 15;
            mirs.copper = 440;
            mirs.iodine = 90;
            mirs.iron = 10;
            mirs.magnesium = 130;
            mirs.manganese = 1.5;
            mirs.molybdenum = 22;
            mirs.phosphorus = 500;
            mirs.potassium = 2300;
            mirs.selenium = 30;
            mirs.zinc = 5;

        } else if (user.getAge() < 14) {
            mirs.calcium = 1300;
            mirs.chromium = user.sex == Sex.Female ? 21 : 25;
            mirs.copper = 700;
            mirs.iodine = 120;
            mirs.iron = 8;
            mirs.magnesium = 240;
            mirs.manganese = user.sex == Sex.Female ? 1.6 : 1.9;
            mirs.molybdenum = 34;
            mirs.phosphorus = 1250;
            mirs.potassium = user.sex == Sex.Female ? 2300 : 2500;
            mirs.selenium = 40;
            mirs.zinc = 8;

        } else if (user.getAge() < 19) {
            mirs.calcium = 1300;
            mirs.chromium = user.sex == Sex.Female ? 24 : 35;
            mirs.copper = 890;
            mirs.iodine = 150;
            mirs.iron = user.sex == Sex.Female ? 15 : 11;
            mirs.magnesium = user.sex == Sex.Female ? 360 : 410;
            mirs.manganese = user.sex == Sex.Female ? 1.6 : 2.2;
            mirs.molybdenum = 43;
            mirs.phosphorus = 1250;
            mirs.potassium = user.sex == Sex.Female ? 2300 : 3000;
            mirs.selenium = 55;
            mirs.zinc = user.sex == Sex.Female ? 9 : 11;

            if (user.pregnant || user.lactating) {
                mirs.calcium = user.lactating ? 1300 : 1300;
                mirs.chromium = user.lactating ? 44 : 29;
                mirs.copper = 1000;
                mirs.iodine = user.lactating ? 290 : 220;
                mirs.iron = user.lactating ? 10 : 27;
                mirs.magnesium = user.lactating ? 360 : 400;
                mirs.manganese = user.lactating ? 2.6 : 2.0;
                mirs.molybdenum = 50;
                mirs.phosphorus = 1250;
                mirs.potassium = user.lactating ? 2500 : 2600;
                mirs.selenium = user.lactating ? 70 : 60;
                mirs.zinc = user.lactating ? 13 : 12;
            }
        } else if (user.getAge() < 51) {
            mirs.calcium = 1000;
            mirs.chromium = user.sex == Sex.Female ? 25 : 35;
            mirs.copper = 900;
            mirs.iodine = 150;
            mirs.iron = user.sex == Sex.Female ? 18 : 8;
            mirs.magnesium = Sex.Female ? 310 : 400;

            if (user.getAge() >= 31) {
                mirs.magnesium = Sex.Female ? 320 : 420;
            }
            mirs.manganese = user.sex == Sex.Female ? 1.8 : 2.3;
            mirs.molybdenum = 45;
            mirs.phosphorus = 700;
            mirs.potassium = user.sex == Sex.Female ? 2600 : 3400;
            mirs.selenium = 55;
            mirs.zinc = user.sex == Sex.Female ? 8 : 11;

            if (user.pregnant || user.lactating) {
                mirs.calcium = user.lactating ? 1000 : 1000;
                mirs.chromium = user.lactating ? 45 : 30;
                mirs.copper = 1300;
                mirs.iodine = user.lactating ? 290 : 220;
                mirs.iron = user.lactating ? 9 : 27;
                mirs.magnesium = user.lactating ? (user.getAge() >= 31 ? 320 : 310) : (user.getAge() >= 31 ? 360 : 350);
                mirs.manganese = user.lactating ? 2.6 : 2.0;
                mirs.molybdenum = 50;
                mirs.phosphorus = 700;
                mirs.potassium = user.lactating ? 2800 : 2900;
                mirs.selenium = user.lactating ? 70 : 60;
                mirs.zinc = user.lactating ? 12 : 11;
            }
        } else {
            mirs.calcium = user.sex == Sex.Male && user.getAge() < 71 ? 1000 : 1200;
            mirs.chromium = user.sex == Sex.Female ? 20 : 30;
            mirs.copper = 900;
            mirs.iodine = 150;
            mirs.iron = 8;
            mirs.magnesium = user.sex == Sex.Female ? 320 : 420;
            mirs.manganese = user.sex == Sex.Female ? 1.8 : 2.3;
            mirs.molybdenum = 45;
            mirs.phosphorus = 700;
            mirs.potassium = user.sex == Sex.Female ? 2600 : 3400;
            mirs.selenium = 55;
            mirs.zinc = user.sex == Sex.Female ? 8 : 11;
        }
        return mirs;
    }

    public getMaximum(user: User): Minerals {
        let mirs: Minerals = new Minerals();

        mirs.boron = 20;
        mirs.calcium = user.getAge() < 51 ? 2500 : 2000;
        mirs.chloride = 3600;
        mirs.copper = 10000;
        mirs.chromium = 0;
        mirs.fluoride = 10;
        mirs.iodine = 1100;
        mirs.iron = 45;
        mirs.magnesium = 350;
        mirs.manganese = 11;
        mirs.molybdenum = 2000;
        mirs.nickel = 1;
        mirs.phosphorus = user.getAge() > 70 ? 3000 : 4000;
        mirs.potassium = 0;
        mirs.selenium = 400;
        mirs.sodium = 2300;
        mirs.vanadium = 1.8;
        mirs.zinc = 40;

        return mirs;
    }

}