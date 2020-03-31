import { Component, OnInit, inject, Input } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  @Input() recipe: Recipe;
  
  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
  }

  getSimilarRecipes(): Recipe[] {
    return null;
  }

}
