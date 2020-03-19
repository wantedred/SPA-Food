import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { MessageService } from 'src/app/message.service';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Nourishment } from './nourishment';

@Injectable({
  providedIn: 'root'
})
export class NourishmentService {
  
  private nourishmentsUrl = 'https://localhost:44329/api/Nourishments';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient,
    private messageService: MessageService) { }

  private log(message: string) {
    this.messageService.add(`NourishmentService: ${message}`);
  }

  searchNourishments(term: string): Observable<Nourishment[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Nourishment[]>(`${this.nourishmentsUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found nourishments matching "${term}"`) :
         this.log(`no nourishments matching "${term}"`)),
      catchError(this.handleError<Nourishment[]>('searchNourishments', []))
    );
  }

  deleteNourishment(nourishment: Nourishment | number): Observable<Nourishment> {
    const id = typeof nourishment === 'number' ? nourishment : nourishment.id;
    const url = `${this.nourishmentsUrl}/${id}`;
  
    return this.http.delete<Nourishment>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted nourishment id=${id}`)),
      catchError(this.handleError<Nourishment>('deleteNourishment'))
    );
  }

  addNourishment(nourishment: Nourishment): Observable<Nourishment> {
    return this.http.post<Nourishment>(this.nourishmentsUrl, nourishment, this.httpOptions).pipe(
      tap((newNourishment: Nourishment) => this.log(`added nourishment w/ id=${newNourishment.id}`)),
      catchError(this.handleError<Nourishment>('addNourishment'))
    );
  }

  updateNourishment(nourishment: Nourishment): Observable<any> {
    return this.http.put(this.nourishmentsUrl, nourishment, this.httpOptions).pipe(
      tap(_ => this.log(`updated nourishment id=${nourishment.id}`)),
      catchError(this.handleError<any>('updateNourishment'))
    );
  }

  getNourishments(): Observable<Nourishment[]> {
    return this.http.get<Nourishment[]>(this.nourishmentsUrl)
      .pipe(
        tap(_ => this.log('fetched nourishments')),
        catchError(this.handleError<Nourishment[]>('getNourishments', []))
      );
  }

  getNourishment(id: number): Observable<Nourishment> {
    const url = `${this.nourishmentsUrl}/${id}`;
    return this.http.get<Nourishment>(url).pipe(
      tap(_ => this.log(`fetched nourishment id=${id}`)),
      catchError(this.handleError<Nourishment>(`getNourishment id=${id}`))
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
