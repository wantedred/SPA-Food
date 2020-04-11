import { Injectable } from '@angular/core';
import { AccountService } from '../account/account.service';
import { Nourishment } from 'src/app/nutrition/nourishments/nourishment';
import { Observable, of } from 'rxjs';
import { AuthenticateService } from '../authenticate/authenticate.service';
import { InventoryResponse } from 'src/app/server/http/nourishments-response';
import { Constants } from 'src/app/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { handleError } from 'src/app/debug/http-error-handler';
import { Dish } from 'src/app/nutrition/dish';
import { DishesResponse } from 'src/app/server/http/dishes-response copy';
import { InventoryItem } from './inventory-item';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  jsonHeaders = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private authService: AuthenticateService) { }


  public getNourishments(): Observable<InventoryResponse> {
    if (!this.authService.isLoggedIn()) {
      return null;
    }
    const httpOptions = {
      headers: { 'Content-Type': 'application/json' },
      params: {
        'name': encodeURIComponent(this.authService.authedUser.emailAddress)
      }
    };
    return this.http.get<InventoryResponse>(Constants.inventoryUrl, httpOptions)
      .pipe(tap(_ => console.log("getNourishments"))
      , catchError(handleError<InventoryResponse>('inventory')));
  }

  public getSuggestedDishes(): Observable<DishesResponse> {
    if (!this.authService.isLoggedIn()) {
      return of(null);
    }
    if (this.authService.authedUser.inventory.inventoryItems.length <= 0) {
      return of(null);
    }
    let nourishments: Nourishment[] = [];

    this.authService.authedUser.inventory.inventoryItems.forEach(item => {
      nourishments.push(item.nourishment);
    });
    return this.http.post<DishesResponse>(Constants.dishSuggestUrl, {
      username: this.authService.authedUser.emailAddress,
      nourishments: nourishments
    }, this.jsonHeaders)
      .pipe(tap(_ => console.log("getSuggestedDishes"))
      , catchError(handleError<DishesResponse>('dish/suggest')));
  }

  public set(inventoryItem: InventoryItem | number, quantity: number): Observable<InventoryResponse> {
    if (!this.authService.isLoggedIn()) {
      return of(null);
    }
    const id = typeof inventoryItem === 'number' ? inventoryItem : inventoryItem.id;

    if (quantity < 0 || quantity >= 999999999) {
      return of(null);
    }
    const httpOptions = {
      headers: { 'Content-Type': 'application/json' },
      params: {
        'name': encodeURIComponent(this.authService.authedUser.emailAddress),
        'id': encodeURIComponent(id),
        'q': encodeURIComponent(quantity),
      }
    };
    return this.http.delete<InventoryResponse>(Constants.inventorySetUrl, httpOptions)
      .pipe(tap(_ => console.log("delete"))
      , catchError(handleError<InventoryResponse>('inventory/set')));
  }

  public remove(inventoryItem: InventoryItem | number): Observable<InventoryResponse> {
    if (!this.authService.isLoggedIn()) {
      return of(null);
    }
    const id = typeof inventoryItem === 'number' ? inventoryItem : inventoryItem.id;

    const httpOptions = {
      headers: { 'Content-Type': 'application/json' },
      params: {
        'name': encodeURIComponent(this.authService.authedUser.emailAddress),
        'id': encodeURIComponent(id)
      }
    };
    return this.http.delete<InventoryResponse>(Constants.inventoryRemoveUrl, httpOptions)
      .pipe(tap(_ => console.log("delete"))
      , catchError(handleError<InventoryResponse>('inventory/remove')));
  }

  public clear(): Observable<InventoryResponse> {
    if (!this.authService.isLoggedIn()) {
      return of(null);
    }
    const httpOptions = {
      headers: { 'Content-Type': 'application/json' },
      params: {
        'name': encodeURIComponent(this.authService.authedUser.emailAddress)
      }
    };
    return this.http.get<InventoryResponse>(Constants.inventoryClearUrl, httpOptions)
      .pipe(tap(_ => console.log("clear"))
      , catchError(handleError<InventoryResponse>('inventory/clear')));
  }

  public add(nourishment: Nourishment | number): Observable<InventoryResponse> {
    if (!this.authService.isLoggedIn()) {
      return of(null);
    }
    const id = typeof nourishment === 'number' ? nourishment : nourishment.id;

    const httpOptions = {
      headers: { 'Content-Type': 'application/json' },
      params: {
        'name': encodeURIComponent(this.authService.authedUser.emailAddress),
        'id': encodeURIComponent(id)
      }
    };
    return this.http.post<InventoryResponse>(Constants.inventoryAddUrl, httpOptions)
      .pipe(tap(_ => console.log("add"))
      , catchError(handleError<InventoryResponse>('inventory/add')));
  }

}
