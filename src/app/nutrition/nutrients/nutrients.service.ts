import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { MessageService } from 'src/app/message.service';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Nutrients } from './nutrients';

@Injectable({
  providedIn: 'root'
})
export class NutrientsService {

  private nutrientsUrl = 'https://localhost:44329/api/Nutrients';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient,
    private messageService: MessageService) { }

  private log(message: string) {
    this.messageService.add(`NutrientsService: ${message}`);
  }

  searchNutrients(term: string): Observable<Nutrients[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Nutrients[]>(`${this.nutrientsUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found nutrients matching "${term}"`) :
         this.log(`no nutrients matching "${term}"`)),
      catchError(this.handleError<Nutrients[]>('searchNutrients', []))
    );
  }

  deleteNutrients(nutrients: Nutrients | number): Observable<Nutrients> {
    const id = typeof nutrients === 'number' ? nutrients : nutrients.id;
    const url = `${this.nutrientsUrl}/${id}`;
  
    return this.http.delete<Nutrients>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted nutrients id=${id}`)),
      catchError(this.handleError<Nutrients>('deleteNutrients'))
    );
  }

  addNutrients(nutrients: Nutrients): Observable<Nutrients> {
    return this.http.post<Nutrients>(this.nutrientsUrl, nutrients, this.httpOptions).pipe(
      tap((newNutrients: Nutrients) => this.log(`added nutrients w/ id=${newNutrients.id}`)),
      catchError(this.handleError<Nutrients>('addNutrients'))
    );
  }

  updateNutrients(nutrients: Nutrients): Observable<any> {
    return this.http.put(this.nutrientsUrl, nutrients, this.httpOptions).pipe(
      tap(_ => this.log(`updated nutrients id=${nutrients.id}`)),
      catchError(this.handleError<any>('updateNutrients'))
    );
  }

  getAllNutrients(): Observable<Nutrients[]> {
    return this.http.get<Nutrients[]>(this.nutrientsUrl)
      .pipe(
        tap(_ => this.log('fetched nutrients')),
        catchError(this.handleError<Nutrients[]>('getAllNutrients', []))
      );
  }

  getNutrients(id: number): Observable<Nutrients> {
    const url = `${this.nutrientsUrl}/${id}`;
    return this.http.get<Nutrients>(url).pipe(
      tap(_ => this.log(`fetched nutrients id=${id}`)),
      catchError(this.handleError<Nutrients>(`getNutrients id=${id}`))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
