import { Nourishment } from '../nutrition/nourishment/nourishment';

export interface Ingredient {
    nourishment: Nourishment;
    quantity: number;
    measurementUnit: string;
}