import { Injectable } from '@angular/core';
import { NourishmentSearch } from './nourishment-search';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Nourishment } from './nourishment';
import { Constants } from 'src/app/constants';
import { tap, catchError } from 'rxjs/operators';
import { handleError } from 'src/app/debug/http-error-handler';
import { BasicHttpResponse } from 'src/app/server/http/basic-http-response';

@Injectable({
  providedIn: 'root'
})
export class NourishmentService {

  jsonHeaders = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private http: HttpClient) {}

  public fetchNourishments(): Observable<Nourishment[]> {
    return this.http.get<Nourishment[]>(Constants.nourishmentsUrl, this.jsonHeaders)
    .pipe(tap(_ => console.log('fetched nourishments'))
    , catchError(handleError<Nourishment[]>('fetchNourishments', [])));
  }
  public searchNourishments(searchType: NourishmentSearch): Observable<Nourishment[]> {
    return this.http.post<Nourishment[]>(Constants.searchNourishmentUrl, searchType, this.jsonHeaders)
      .pipe(tap(x => x.length 
        ? console.log("found nourishments") 
        : console.log("No nourishments found")), 
        catchError(handleError<Nourishment[]>('searchNourishments', [])));
  }

  public getNourishment(id: number): Observable<Nourishment> {
    const url = `${Constants.nourishmentsUrl}/${id}`;

    return this.http.get<Nourishment>(url, this.jsonHeaders)
      .pipe(tap(_ => console.log(`fetched nourishment id=${id}`))
      , catchError(handleError<Nourishment>(`getNourishment id=${id}`)));
  }

  public deleteNourishment(nourishment: Nourishment | number): Observable<BasicHttpResponse> {
    const id = typeof nourishment === 'number' ? nourishment : nourishment.id;
    const url = `${Constants.nourishmentsUrl}/${id}`;
  
    return this.http.delete<BasicHttpResponse>(url, this.jsonHeaders)
      .pipe(tap(_ => console.log(`deleted nourishment id=${id}`))
      , catchError(handleError<BasicHttpResponse>('deleteNourishment')));
  }

  public addNourishment(nourishment: Nourishment): Observable<BasicHttpResponse> {
    console.log("Adding nourishment " + Constants.usersUrl);

    return this.http.post<BasicHttpResponse>(Constants.nourishmentsUrl, nourishment, this.jsonHeaders)
      .pipe(tap(_ => console.log("added nourishment"))
      , catchError(handleError<BasicHttpResponse>('addNourishment')));
  }

  public updateNourishment(nourishment: Nourishment): Observable<BasicHttpResponse> {
    return this.http.put<BasicHttpResponse>(Constants.nourishmentsUrl, nourishment, this.jsonHeaders)
      .pipe(tap(_ => console.log(`updated nourishment id=${nourishment.id}`))
      , catchError(handleError<BasicHttpResponse>('updateNourishment')));
  }

}
