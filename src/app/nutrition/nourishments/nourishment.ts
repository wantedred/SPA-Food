import { Nutrients } from '../nutrients/nutrients';
import { NourishmentType } from '../util/nourishment-type';

export class Nourishment {

    public id: number;
    public name: string;
    public brand: string;
    public nourishmentType: NourishmentType;
    public thumbnail: string;
    public image: string;
    public nutrients: Nutrients;


    public hasMedia(): boolean {
        return this.thumbnail != null && this.image != null;
    }

    public hasNutrients(): boolean {
        return this.nutrients != null;
    }

}