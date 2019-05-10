import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SeguridadService {
  baseUrl = environment.baseUrl + '/api/seguridad/';

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
