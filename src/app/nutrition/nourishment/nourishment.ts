import { Nutrients } from '../nutrients/nutrients';

export interface Nourishment {

    id: number;
    name: string;
    brand: string;
    nutrients: Nutrients;

}