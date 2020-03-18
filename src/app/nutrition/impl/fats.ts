import { ICountable } from '../i-countable';
import { PolyUnsaturatedFats } from './poly-unsaturated-fats';
import { IIntakeRecommendation } from '../i-intake-recommendation';
import { User } from 'src/app/users/user';

export class Fats implements ICountable, IIntakeRecommendation {

    public monoUnsaturated: number;
    public polyUnsaturated: PolyUnsaturatedFats;
    public saturated: number;
    public transFats: number;


    public getTotalCount(): number {
        return this.monoUnsaturated + this.saturated + this.transFats + this.polyUnsaturated.getTotalCount();
    }

    public getMinimum(user: User): Fats {
        let fats: Fats = new Fats();

        fats.monoUnsaturated = 0;
        fats.polyUnsaturated = new PolyUnsaturatedFats();
        fats.saturated = 0;
        fats.transFats = 0;

        return fats;
    }

    public getMaximum(user: User): Fats {
        let fats: Fats = new Fats();

        fats.monoUnsaturated = 250;
        fats.polyUnsaturated = new PolyUnsaturatedFats();
        fats.saturated = 20;
        fats.transFats = 0;

        return fats;
    }

}