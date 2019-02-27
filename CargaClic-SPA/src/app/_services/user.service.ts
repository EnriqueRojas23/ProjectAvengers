import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../_models/user';


const httpOptions = {
  headers: new HttpHeaders({
    'Authorization' : 'Bearer ' + localStorage.getItem('token'),
    'Content-Type' : 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'http://localhost:5000/api/users/';
  constructor(private http: HttpClient) { }

  registrar(model: any){
    return this.http.post(this.baseUrl + 'register', model,httpOptions)
    .pipe(
      map((response: any) => {
         const user = response;
         if(user)
         {
         
         }
      } 
    )
    )};
  actualizar(model:any){
    return this.http.post(this.baseUrl + 'update', model,httpOptions)
    .pipe(
      map((response: any) => {
        const user = response;
         if(user)
         {
           
         }
      })
    )
  }
  actualizarEstado(model:any){
    return this.http.post(this.baseUrl + 'updateestado', model,httpOptions)
    .pipe(
      map((response: any) => {
        const user = response;
         if(user)
         {
           
         }
      })
    )
  }

  getUsers() : Observable<User[]> {
     return this.http.get<User[]>(this.baseUrl, httpOptions);
  }
  getUser(id: number) : Observable<User> {
    return this.http.get<User>(this.baseUrl + id, httpOptions);
 }


}
