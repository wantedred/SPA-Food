import { ICountable } from '../i-countable';

export class Sugars implements ICountable {

    private recommended: number;
    public fructose: number;
    public galactose: number;
    public glucose: number;
    public lactose: number;
    public maltose: number;
    public sucrose: number;


    public constructor(recommended: number) {
        this.recommended = recommended;
    }

    public getRecommended(): number { 
        return this.recommended > 0 ? this.recommended : this.getTotalCount();
    }

    public getTotalCount(): number { 
        return this.fructose + this.galactose + this.glucose + this.lactose
            + this.maltose + this.sucrose;
    }

}