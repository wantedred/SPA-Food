import { BasicHttpResponse } from './basic-http-response';
import { Dish } from 'src/app/nutrition/dish';

export interface DishesResponse extends BasicHttpResponse {
    suitableDishes: Dish[];
    optionalDishes: Dish[];
}