import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Nourishment } from 'src/app/nutrition/nourishments/nourishment';
import { InventoryService } from './inventory.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Dish } from 'src/app/nutrition/dish';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { MatTableDataSource } from '@angular/material/table';
import { InventoryItem } from './inventory-item';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit, AfterViewInit {

  invItems: InventoryItem[] = [];
  suitableDishes: Dish[] = [];
  optionalDishes: Dish[] = [];

  public messages: Message[] = [];

  searchControl: FormControl;

  data: MatTableDataSource<Message> = null;

  @ViewChild(CdkVirtualScrollViewport)
  viewport: CdkVirtualScrollViewport;

  constructor(
    private invService: InventoryService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    let msg: Message = {
      content: "2",
      from: "Apple",
      subject: "Granny Smith"
    };
    this.messages = [msg, msg, msg, msg, msg, msg, msg, msg, msg, msg, msg, msg, msg, msg, msg, msg, msg, msg, msg, msg, msg, 
      msg, msg, msg, msg, msg, msg, msg, msg, msg, msg, msg, msg, msg, msg, msg, msg, msg, msg, msg, msg, msg, 
      msg, msg, msg, msg, msg, msg, msg, msg, msg, msg, msg, msg, msg, msg, msg, msg, msg, msg, msg, msg, msg, msg, msg, msg, 
      msg, msg, msg, msg, msg, msg, msg, msg, msg, msg, msg, msg, msg, msg, msg, msg, msg, msg, msg, msg, msg, ];

    this.searchControl = new FormControl('', [Validators.required, Validators.minLength(2)]);
    this.loadInventory();
  }

  ngAfterViewInit() {
    // If the user changes the sort order, reset back to the first page.
    this.data = new MatTableDataSource(this.messages);
    //this.data.paginator = this.paginator;
    //this.data.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data.filter = filterValue.trim().toLowerCase();

    /*if (this.data.paginator) {
      this.data.paginator.firstPage();
    }*/
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

  search(): void {
    let val:string = this.searchControl.value;
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
export interface Message {
  from: string;
  content: string;
  subject: string;
}
