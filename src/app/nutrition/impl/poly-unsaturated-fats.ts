import { ICountable } from '../i-countable';
import { IIntakeRecommendation } from '../i-intake-recommendation';
import { User } from 'src/app/users/user';

export class PolyUnsaturatedFats implements ICountable, IIntakeRecommendation {

    public omega3: number;
    public omega6: number;


    public getTotalCount(): number {
        return this.omega3 + this.omega6;
    }

    public getMinimum(user: User): PolyUnsaturatedFats {
        let fats: PolyUnsaturatedFats = new PolyUnsaturatedFats();

        fats.omega3 = 1.6;
        fats.omega6 = 17;

        return fats;
    }

    public getMaximum(user: User): PolyUnsaturatedFats {
        let fats: PolyUnsaturatedFats = new PolyUnsaturatedFats();

        fats.omega3 = 0;
        fats.omega6 = 0;

        return fats;
    }

}