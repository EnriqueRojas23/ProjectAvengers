import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from 'src/app/_models/Mantenimiento/producto';

const httpOptions = {
    headers: new HttpHeaders({
      'Authorization' : 'Bearer ' + localStorage.getItem('token'),
      'Content-Type' : 'application/json'
    }),
}
@Injectable({
    providedIn: 'root'
  })
export class ProductoService {
    baseUrl = 'http://localhost:5000/api/producto/';

constructor(private http: HttpClient) { }
    getAll(criterio: string, ProductoId: number) : Observable<Producto[]> {
      return this.http.get<Producto[]>(this.baseUrl + "?criterio=" + criterio 
        + "&ClienteId=" + ProductoId, httpOptions)
      };
}