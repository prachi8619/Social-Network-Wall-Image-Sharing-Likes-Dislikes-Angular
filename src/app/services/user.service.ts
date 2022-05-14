import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../objects/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  user: any;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  public createNewUser(user:any) : Observable<User> {
    return this.http
      .post<User>(
        'http://localhost:3000/users',
        JSON.stringify(user),
        this.httpOptions
      );
  }

  public getUser(email: string): Observable<User> {
    return this.http
      .get<User>('http://localhost:3000/users?email=' + email);
  }
}
