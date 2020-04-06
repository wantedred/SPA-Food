import { Ingredient } from './ingredient';
import { RecipeCreationTime } from './recipe-creation-time';
import { RecipeStep } from './recipe-step';
import { UserSubmittedPhoto } from './user-submitted-photo';
import { RecipeReview } from './recipe-review';

export interface Recipe {
    
    servings: number;
    creationTime: RecipeCreationTime;
    ingredients: Ingredient[];
    steps: RecipeStep[];
    notes: string;
    madeCount: number;
    reviews: RecipeReview[];
}