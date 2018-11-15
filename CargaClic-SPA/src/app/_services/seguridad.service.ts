import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SeguridadService {
  baseUrl = 'http://localhost:5000/api/seguridad/';

  constructor(private http: HttpClient) { }

  // obtenerMenu(IdRol: any) {
  //   return this.http.get(this.baseUrl + 'GetPantallasxRol', IdRol )
  //    .pipe(
  //      map((response: any) => {
  //       const menu = response;
  //      })
  //    );
  // }

}
