import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from './recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {


  constructor() { }


  public searchRecipes(): Observable<Recipe[]> {
    return null;
  }

  public getRecipe(): Observable<Recipe> {
    return null;
  }

  public getSimilarRecipes(): Observable<Recipe[]> {
    return null;
  }

  public getRecipeReviews(recipe: Recipe): Observable<string[]> {
    return null;
  }

}
