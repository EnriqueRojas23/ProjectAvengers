import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
baseUrl = 'http://localhost:5000/api/auth/';
jwtHelper = new JwtHelperService();
decodedToken: any;

constructor(private http: HttpClient) { }

login(model: any) {
  return this.http.post(this.baseUrl + 'login', model)
  .pipe(
    map((response: any) => {
      const user = response;
      if (user) {
        localStorage.setItem('token', user.token);
        this.decodedToken = this.jwtHelper.decodeToken(user.token);

        const stringMenu = JSON.stringify(user.menu);
        localStorage.setItem('menu', stringMenu);

         localStorage.removeItem('Name');
         localStorage.removeItem('RememberMe');
         if(model.recuerdame){
             localStorage.setItem('Name', model.username);
             localStorage.setItem('RememberMe', JSON.stringify(model.recuerdame));
          }
      }
    })
  );
 }
 loggedIn() {
   const token = localStorage.getItem('token');
   return !this.jwtHelper.isTokenExpired(token);
 }
 
}
