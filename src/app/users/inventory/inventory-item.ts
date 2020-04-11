import { Nourishment } from 'src/app/nutrition/nourishments/nourishment';

export interface InventoryItem {
    id: number;
    quantity: number;
    nourishment: Nourishment;
}