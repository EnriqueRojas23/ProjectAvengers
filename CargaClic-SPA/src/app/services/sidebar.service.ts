import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  baseUrl = 'http://localhost:5000/api/seguridad/';
  menu: any[] = [];
  IdRol: any;

  constructor(private http: HttpClient) {
      this.IdRol = 1;
      // tslint:disable-next-line:max-line-length
      const token =  'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwidW5pcXVlX25hbWUiOiJlcm9qYXMiLCJuYmYiOjE1NDIyMjk5NjQsImV4cCI6MTU0MjMxNjM2NCwiaWF0IjoxNTQyMjI5OTY0fQ.WkxhtYXYlbK1LEF_ywEcyTgaUnjF-ErzuS9uKbeIELMJ_gc7b0yKOvfGhXmF3yta4eROkMezIBxSEoITvlADCA');
      const headers = new HttpHeaders().set('Authorization', 'bearer ' + token);
      console.log(headers);
      this.http.get(this.baseUrl + 'GetPantallasxRol/' + this.IdRol, { headers })
       .toPromise()
       .then(
        (response: any)  => {
        this.menu = response;
        console.log(this.menu);
      });
   }
}
