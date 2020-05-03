import { Component, OnInit, ViewChild, AfterViewInit, Output } from '@angular/core';
import { Nourishment } from 'src/app/nutrition/nourishments/nourishment';
import { InventoryService } from './inventory.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Dish } from 'src/app/nutrition/dish';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { MatTableDataSource } from '@angular/material/table';
import { InventoryItem } from './inventory-item';
import { FormControl, Validators } from '@angular/forms';
import { DishCardComponent } from 'src/app/nutrition/dishes/dish-card/dish-card.component';
import { DishType } from 'src/app/nutrition/util/dish-type';
import { NourishmentType } from 'src/app/nutrition/util/nourishment-type';
import { Nutrients } from 'src/app/nutrition/nutrients/nutrients';
import { NourishmentService } from 'src/app/nutrition/nourishments/nourishment.service';
import { NourishmentSearchType } from 'src/app/nutrition/nourishments/nourishment-search-type';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  invItems: InventoryItem[] = [];
  displayInvItems: InventoryItem[] = [];

  suitableDishes: Dish[] = [];
  optionalDishes: Dish[] = [];

  nourishmentSuggestions: Nourishment[] = [];

  invSearchControl: FormControl;
  itemSearchControlName: FormControl;

  @ViewChild(CdkVirtualScrollViewport)
  viewport: CdkVirtualScrollViewport;

  constructor(
    private nourishService: NourishmentService,
    private invService: InventoryService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    let nourishment: Nourishment = new Nourishment();
    nourishment.id = 0;
    nourishment.name = 'Apple';
    nourishment.brand = 'Granny Smiths';
    nourishment.nourishmentType = NourishmentType.Fruit;
    nourishment.thumbnail = '';
    nourishment.image = '';
    nourishment.nutrients = new Nutrients();

    let invItem: InventoryItem = {
      id: 0,
      quantity: 2,
      nourishment: nourishment
    };
    this.invSearchControl = new FormControl('', [Validators.required, Validators.minLength(2)]);
    this.itemSearchControlName = new FormControl('', [Validators.required, Validators.minLength(2)]);
    this.loadInventory();

    //Temp
    this.invItems = [invItem, invItem, invItem, invItem, invItem, invItem, invItem, invItem, invItem, invItem, invItem, invItem, invItem];
    
    let dish: Dish = {
      name: 'Meatloaf for life',
      description: 'description',
      dishType: DishType.BreadSalad,
      thumbnail: 'https://images.media-allrecipes.com/userphotos/560x315/4580358.jpg',
      image: 'https://images.media-allrecipes.com/userphotos/560x315/4580358.jpg',
      nourishments: []
    };
    let dish2: Dish = {
      name: 'Shiba',
      description: 'description',
      dishType: DishType.BreadSalad,
      thumbnail: 'https://material.angular.io/assets/img/examples/shiba1.jpg',
      image: 'https://material.angular.io/assets/img/examples/shiba1.jpg',
      nourishments: []
    };
    this.suitableDishes = [dish, dish, dish];
    this.optionalDishes = [dish2, dish2, dish2];
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    if (filterValue == null || filterValue == "") {
      this.nourishmentSuggestions = [];
      return;
    }
    this.nourishService.searchNourishments(filterValue)
      .subscribe(ns => {
        if (ns.length > 0) {
          this.nourishmentSuggestions = ns;
          return;
        }
        this.nourishmentSuggestions = [];
      }
    );
  }

  addToInv(nourishment: Nourishment): void {
    this.nourishmentSuggestions = [];
    this.itemSearchControlName.patchValue('');
    this.add(nourishment);
  }

  searchInv(): void {
    let val:string = this.invSearchControl.value;

    if (val == null || val == "") {
      this.displayInvItems = this.invItems;
      return;
    }
    val = val.toLowerCase();
    this.displayInvItems = [];

    this.invItems.forEach(ii => {
      if (ii.nourishment.name.toLowerCase().indexOf(val) >= 0 || ii.nourishment.brand.toLowerCase().indexOf(val) >= 0) {
        this.displayInvItems.push(ii);
      }
    });
  }

  modifyQuantity(invItem: InventoryItem, up: boolean): void {
    if (invItem.quantity <= 0 && !up) {
      return;
    }
    const isZero = invItem.quantity == 1 && !up;

    this.invService.set(invItem, up ? invItem.quantity + 1 : invItem.quantity - 1).subscribe(resp => {
      if (resp == null) {
        return;
      }
      if (!resp.success) {
        this.toast(resp.message, null);
        return;
      }
      this.invItems = resp.inventoryItems;

      if (!isZero) {
        this.loadSuggestedDishes();
      }
    });
  }

  setQuantity(invItem: InventoryItem, quantity: number): void {
    if (quantity < 0 || quantity > 999999) {
      return;
    }
    this.invService.remove(invItem).subscribe(resp => {
      if (resp == null) {
        return;
      }
      if (!resp.success) {
        this.toast(resp.message, null);
        return;
      }
      this.invItems = resp.inventoryItems;

      if (quantity > 0) {
        this.loadSuggestedDishes();
      }
    });
  }

  remove(invItem: InventoryItem): void {
    this.invService.remove(invItem).subscribe(resp => {
      if (resp == null) {
        return;
      }
      if (!resp.success) {
        this.toast(resp.message, null);
        return;
      }
      this.invItems = resp.inventoryItems;
      this.loadSuggestedDishes();
    });
  }

  add(nourishment: Nourishment | number): void {
    this.invService.add(nourishment)
      .subscribe(resp => {
        if (resp == null) {
          return;
        }
        if (!resp.success) {
          this.toast(resp.message, null);
          return;
        }
        this.invItems = resp.inventoryItems;
        this.loadSuggestedDishes();
      }
    );
  }

  loadInventory(): void {
    this.invService.getNourishments()
      .subscribe(resp => {
        if (resp == null) {
          return;
        }
        if (resp.success) {
          this.invItems = resp.inventoryItems;
          this.loadSuggestedDishes();
          return;
        }
        this.toast(resp.message, 'inventory');
      }
    );
  }

  loadSuggestedDishes(): void {
    this.invService.getSuggestedDishes()
      .subscribe(resp => {
        if (resp == null) {
          return;
        }
        if (!resp.success) {
          this.toast(resp.message, 'suggestedDishes');
          return;
        }
        this.suitableDishes = resp.suitableDishes;
        this.optionalDishes = resp.optionalDishes;
      }
    );
  }

  toast(message: string, controller: string): void {
    let snackbarRef = this.snackBar.open(message, controller == null ? "Dishmiss" : "Try again", {
      duration: 5000,
    });
    snackbarRef.afterDismissed().subscribe(() => {
      console.log('The snack-bar was dismissed');
    });
    snackbarRef.onAction().subscribe(() => {
      if (controller == 'inventory') {
        this.loadInventory();
      } else if (controller == 'suggestedDishes') {
        this.loadSuggestedDishes();
      }
    });
    return;
  }

}
