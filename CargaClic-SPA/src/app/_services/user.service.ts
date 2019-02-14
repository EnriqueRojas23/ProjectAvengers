import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../_models/user';


const httpOptions = {
  headers: new HttpHeaders({
    'Authorization' : 'Bearer ' + localStorage.getItem('token')
  })
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'http://localhost:5000/api/users/';
  constructor(private http: HttpClient) { }


  getUsers() : Observable<User[]> {
     return this.http.get<User[]>(this.baseUrl, httpOptions);
  }
  getUser(id: number) : Observable<User> {
    return this.http.get<User>(this.baseUrl + id, httpOptions);
 }


}
