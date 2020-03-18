import { ICountable } from '../i-countable';

export class VitaminE implements ICountable {

    private alphaTocopherol: number;
    public betaTocopherol: number; //mg
    public deltaTocopherol: number; //mg
    public gammaTocopherol: number; //mg

    
    public constructor(alphaTocopherol: number = 0) {
        this.alphaTocopherol = alphaTocopherol;
    }

    public getAlphaTocopherol(): number { //mg
        return this.alphaTocopherol > 0 ? this.alphaTocopherol : (this.betaTocopherol + this.deltaTocopherol + this.gammaTocopherol);
    }

    public getTotalCount(): number { //mg
        return this.getAlphaTocopherol();
    }

}