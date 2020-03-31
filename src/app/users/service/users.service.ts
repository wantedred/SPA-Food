import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../user';
import { tap, catchError } from 'rxjs/operators';
import { Constants } from 'src/app/constants';
import { handleError } from 'src/app/debug/http-error-handler';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  jsonHeaders = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private constructor(
    private http: HttpClient) { }

  public fetchUsers() : Observable<User[]> {
    return this.http.get<User[]>(Constants.usersUrl, this.jsonHeaders)
      .pipe(tap(_ => this.log('fetched users'))
      , catchError(handleError<User[]>('fetchUsers', [])));
  }

  public getUser(id: number): Observable<User> {
    const url = `${Constants.usersUrl}/${id}`;

    return this.http.get<User>(url, this.jsonHeaders)
      .pipe(tap(_ => this.log(`fetched user id=${id}`))
      , catchError(handleError<User>(`getUser id=${id}`)));
  }

  public getUserByEmailAddress(emailAddress: string) : Observable<User> {
    return this.http.get<User>(`${Constants.usersUrl}/?email=${emailAddress}`, this.jsonHeaders)
      .pipe(tap(_ => this.log(`found userby email address`))
      , catchError(handleError<User>('getUserByEmailAddress')));
  }

  public searchUsers(searchInput: string) : Observable<User[]> {
    if (!searchInput.trim()) {
      return of([]);
    }
    return this.http.get<User[]>(`${Constants.usersUrl}/?name=${searchInput}`, this.jsonHeaders)
      .pipe(tap(x => x.length 
        ? this.log(`found users matching "${searchInput}"`) 
        : this.log(`no users matching "${searchInput}"`)), 
        catchError(handleError<User[]>('searchUsers', [])));
  }

  public deleteUser(user: User | number): Observable<User> {
    const id = typeof user === 'number' ? user : user.id;
    const url = `${Constants.usersUrl}/${id}`;
  
    return this.http.delete<User>(url, this.jsonHeaders)
      .pipe(tap(_ => this.log(`deleted user id=${id}`))
      , catchError(handleError<User>('deleteUser')));
  }

  public addUser(user: User): Observable<User> {
    console.log("Adding user in users service " + Constants.usersUrl);

    return this.http.post<User>(Constants.registerUrl, user, this.jsonHeaders)
      .pipe(tap((newUser: User) => this.log(`added user w/ id=${newUser.id}`))
      , catchError(handleError<User>('addUser')));
  }

  public updateUser(user: User): Observable<any> {
    return this.http.put(Constants.usersUrl, user, this.jsonHeaders)
      .pipe(tap(_ => this.log(`updated user id=${user.id}`))
      , catchError(handleError<any>('updateUser')));
  }

  private log(message: string) {
    console.log(`UsersService: ${message}`);
  }

}
