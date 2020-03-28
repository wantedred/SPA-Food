import { Ingredient } from './ingredient';
import { RecipeCreationTime } from './recipe-creation-time';

export interface Recipe {
    name: string;
    description: string;
    thumbnail: string;
    mainPicture: string;
    pictures: string[];
    ingredients: Ingredient[];
    servings: number;
    creationTime: RecipeCreationTime;
    steps: string[];
    notes: string[];
    madeCount: number;
    rating: number;
    reviews: number; //TODO review obj
}