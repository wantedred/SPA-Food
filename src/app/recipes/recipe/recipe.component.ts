import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  constructor(
    private recipe: Recipe,
    private recipeService: RecipeService) { }

  ngOnInit(): void {
  }

  getSimilarRecipes(): Recipe[] {
    return null;
  }

}
