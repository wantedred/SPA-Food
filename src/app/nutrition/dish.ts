import { DishType } from './util/dish-type';
import { Nourishment } from './nourishments/nourishment';

export interface Dish {
    name: string;
    description: string;
    dishType: DishType;
    thumbnail: string;
    image: string;
    nourishments: Nourishment[];
}