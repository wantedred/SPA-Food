import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from './recipe';
import { MealType } from '../nutrition/util/meal-type';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {


  constructor() { }


  public searchRecipes(query: string = "", mealType: MealType = null): Observable<Recipe[]> {
    return null;
  }

  public getRecipe(): Observable<Recipe> {
    return null;
  }

  public getRecipes(mealType: MealType = null) {

  }

  public getSimilarRecipes(): Observable<Recipe[]> {
    return null;
  }

  public getRecipeReviews(recipe: Recipe): Observable<string[]> {
    return null;
  }

}
