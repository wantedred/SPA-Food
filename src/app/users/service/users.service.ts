import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { MessageService } from 'src/app/message.service';
import { Observable, of } from 'rxjs';
import { User } from '../user';
import { tap, catchError } from 'rxjs/operators';
import { Constants } from 'src/app/constants';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private usersApiUrl = Constants.serverUrl + "Users";

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  private constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  public fetchUsers() : Observable<User[]> {
    return this.http.get<User[]>(this.usersApiUrl)
      .pipe(tap(_ => this.log('fetched users'))
      , catchError(this.handleError<User[]>('fetchUsers', [])));
  }

  public getUser(id: number): Observable<User> {
    const url = `${this.usersApiUrl}/${id}`;

    return this.http.get<User>(url)
      .pipe(tap(_ => this.log(`fetched user id=${id}`))
      , catchError(this.handleError<User>(`getUser id=${id}`)));
  }

  public searchUsers(searchInput: string) : Observable<User[]> {
    if (!searchInput.trim()) {
      return of([]);
    }
    return this.http.get<User[]>(`${this.usersApiUrl}/?name=${searchInput}`)
      .pipe(tap(x => x.length 
        ? this.log(`found users matching "${searchInput}"`) 
        : this.log(`no users matching "${searchInput}"`)), 
        catchError(this.handleError<User[]>('searchUsers', [])));
  }

  public deleteUser(user: User | number): Observable<User> {
    const id = typeof user === 'number' ? user : user.id;
    const url = `${this.usersApiUrl}/${id}`;
  
    return this.http.delete<User>(url, this.httpOptions)
      .pipe(tap(_ => this.log(`deleted user id=${id}`))
      , catchError(this.handleError<User>('deleteUser')));
  }

  public addUser(user: User): Observable<User> {
    return this.http.post<User>(this.usersApiUrl, user, this.httpOptions)
      .pipe(tap((newUser: User) => this.log(`added user w/ id=${newUser.id}`))
      , catchError(this.handleError<User>('addUser')));
  }

  public updateUser(user: User): Observable<any> {
    return this.http.put(this.usersApiUrl, user, this.httpOptions)
      .pipe(tap(_ => this.log(`updated user id=${user.id}`))
      , catchError(this.handleError<any>('updateUser')));
  }

  private log(message: string) {
    this.messageService.add(`UsersService: ${message}`);
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