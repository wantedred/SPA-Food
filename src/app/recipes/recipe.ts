import { Ingredient } from './ingredient';
import { RecipeCreationTime } from './recipe-creation-time';
import { MealType } from './meal-type';

export interface Recipe {
    name: string;
    description: string;
    mealType: MealType;
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