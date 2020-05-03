import { Component, OnInit, Input } from '@angular/core';
import { Dish } from '../../dish';
import { dishTypeNames, DishTypeName } from '../../util/dish-type';

@Component({
  selector: 'app-dish-card',
  templateUrl: './dish-card.component.html',
  styleUrls: ['./dish-card.component.css']
})
export class DishCardComponent implements OnInit {

  public dishTypeNames: DishTypeName[] = dishTypeNames;
  public dishTypeName: string = "Unknown";

  @Input() dish: Dish;

  public placeholderThumbnail: string = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSUP6_bBSi3Mwe2_LNJKolLidbMN1UjA1uyvLcV4DNbRUSoQTRv&usqp=CAU";

  constructor() { }

  ngOnInit(): void {
    console.log("Dish => " + this.dish.name);

    let dtn:DishTypeName = dishTypeNames.find(dtn => dtn.dishType == this.dish.dishType);
    
    if (dtn == null) {
      console.error("Failed to find dish type name for dish type " + this.dish.dishType);
      return;
    }
    this.dishTypeName = dtn.name;
  }

  public hasThumbnail(): boolean {
    return this.dish.thumbnail != null && this.dish.thumbnail != "";
  }

  public hasImage(): boolean {
    return this.dish.image != null && this.dish.image != "";
  }

  public hasDescription(): boolean {
    return this.dish.description != null && this.dish.description != "";
  }

}
