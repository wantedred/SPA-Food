import { Nourishment } from '../nutrition/nourishments/nourishment';


export interface Ingredient {
    nourishment: Nourishment;
    quantity: number;
    measurementUnit: string;
}