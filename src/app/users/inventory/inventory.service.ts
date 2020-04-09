import { Injectable } from '@angular/core';
import { AccountService } from '../account/account.service';
import { Nourishment } from 'src/app/nutrition/nourishments/nourishment';
import { Observable } from 'rxjs';
import { AuthenticateService } from '../authenticate/authenticate.service';
import { NourishmentsResponse } from 'src/app/server/http/nourishments-response';
import { Constants } from 'src/app/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { handleError } from 'src/app/debug/http-error-handler';
import { Dish } from 'src/app/nutrition/dish';
import { DishesResponse } from 'src/app/server/http/dishes-response copy';

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


  public getNourishments(): Observable<NourishmentsResponse> {
    if (!this.authService.isLoggedIn()) {
      return null;
    }
    const httpOptions = {
      headers: { 'Content-Type': 'application/json' },
      params: {
        'name': encodeURIComponent(this.authService.authedUser.emailAddress)
      }
    };
    return this.http.get<NourishmentsResponse>(Constants.inventoryUrl, httpOptions)
      .pipe(tap(_ => console.log("getNourishments"))
      , catchError(handleError<NourishmentsResponse>('inventory')));
  }

  public getSuggestedDishes(): Observable<DishesResponse> {
    if (!this.authService.isLoggedIn()) {
      return null;
    }
    return this.http.post<DishesResponse>(Constants.dishSuggestUrl, {
      username: this.authService.authedUser.emailAddress,
      dishes: this.authService.authedUser.inventory.nourishments
    }, this.jsonHeaders)
      .pipe(tap(_ => console.log("getSuggestedDishes"))
      , catchError(handleError<DishesResponse>('dish/suggest')));
  }

  public delete(nourishment: Nourishment | number): Observable<NourishmentsResponse> {
    if (!this.authService.isLoggedIn()) {
      return null;
    }
    const id = typeof nourishment === 'number' ? nourishment : nourishment.id;

    const httpOptions = {
      headers: { 'Content-Type': 'application/json' },
      params: {
        'name': encodeURIComponent(this.authService.authedUser.emailAddress),
        'id': encodeURIComponent(id)
      }
    };
    return this.http.delete<NourishmentsResponse>(Constants.inventoryUrl, httpOptions)
      .pipe(tap(_ => console.log("delete"))
      , catchError(handleError<NourishmentsResponse>('inventory')));
  }

  public clear(): Observable<NourishmentsResponse> {
    if (!this.authService.isLoggedIn()) {
      return null;
    }
    const httpOptions = {
      headers: { 'Content-Type': 'application/json' },
      params: {
        'name': encodeURIComponent(this.authService.authedUser.emailAddress)
      }
    };
    return this.http.get<NourishmentsResponse>(Constants.inventoryClearUrl, httpOptions)
      .pipe(tap(_ => console.log("clear"))
      , catchError(handleError<NourishmentsResponse>('inventory/clear')));
  }

  public add(nourishment: Nourishment | number): Observable<NourishmentsResponse> {
    if (!this.authService.isLoggedIn()) {
      return null;
    }
    const id = typeof nourishment === 'number' ? nourishment : nourishment.id;

    const httpOptions = {
      headers: { 'Content-Type': 'application/json' },
      params: {
        'name': encodeURIComponent(this.authService.authedUser.emailAddress),
        'id': encodeURIComponent(id)
      }
    };
    return this.http.post<NourishmentsResponse>(Constants.inventoryUrl, httpOptions)
      .pipe(tap(_ => console.log("add"))
      , catchError(handleError<NourishmentsResponse>('inventory')));
  }

}
