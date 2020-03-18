import { Fats } from './fats';
import { IIntakeRecommendation } from '../i-intake-recommendation';
import { Sex } from 'src/app/users/sex';
import { User } from 'src/app/users/user';

export class Lipids implements IIntakeRecommendation {

    public fats: Fats;
    public cholestrol: number;
    public phytosterol: number;


    public getMinimum(user: User): Lipids {
        let lips: Lipids = new Lipids();

        lips.cholestrol = 0;
        lips.fats = new Fats();
        lips.phytosterol = 0;

        return lips;
    }

    public getMaximum(user: User): Lipids {
        let lips: Lipids = new Lipids();

        lips.cholestrol = 250;
        lips.fats = new Fats();
        lips.phytosterol = 0;

        return lips;
    }

}