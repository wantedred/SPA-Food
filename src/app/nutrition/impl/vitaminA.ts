import { ICountable } from '../i-countable';

export class VitaminA implements ICountable {

    private recommended: number;
    public alphaCarotene: number; //µg
    public betaCarotene: number; //µg
    public betaCryptoxanthin: number; //µg
    public luteinZaxanthin: number; //µg
    public lycopene: number; //µg
    public retinol: number; //µg
    public retinolActivityEquivalent: number; //µg

    
    public constructor(recommended: number) {
        this.recommended = recommended;
    }

    public getRecommended(): number { //µg
        return this.recommended > 0 ? this.recommended : this.getTotalCount();
    }

    public getTotalCount(): number { //µg
        return this.alphaCarotene + this.betaCarotene + this.betaCryptoxanthin + this.luteinZaxanthin
            + this.lycopene + this.retinol + this.retinolActivityEquivalent;
    }

}