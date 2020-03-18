import { ICountable } from '../i-countable';

export class Protein implements ICountable {

    public alanine: number;
    public arginine: number;
    public asparticAcid: number;
    public cystine: number;
    public glutamicAcid: number;
    public glycine: number;
    public histidine: number;
    public hydroxyproline: number;
    public isoleucine: number;
    public leucine: number;
    public lysine: number;
    public methionine: number;
    public phenylalanine: number;
    public proline: number;
    public serine: number;
    public threonine: number;
    public tryptophan: number;
    public tyrosine: number;
    public valine: number;


    public getTotalCount(): number {
        return this.alanine + this.arginine + this.asparticAcid + this.cystine + this.glutamicAcid 
        + this.glycine + this.histidine + this.hydroxyproline + this.isoleucine 
        + this.leucine + this.lysine + this.methionine + this.phenylalanine 
        + this.proline + this.serine + this.threonine + this.tryptophan + this.tyrosine + this.valine;
    }

}