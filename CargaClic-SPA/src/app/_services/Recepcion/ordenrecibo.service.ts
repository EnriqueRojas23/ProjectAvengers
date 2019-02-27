import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Observable } from 'rxjs';
import { OrdenRecibo } from 'src/app/_models/Recepcion/ordenrecibo';


const httpOptions = {
  headers: new HttpHeaders({
    'Authorization' : 'Bearer ' + localStorage.getItem('token'),
    'Content-Type' : 'application/json'
  }),
}
  

@Injectable({
  providedIn: 'root'
})
export class OrdenReciboService {
  baseUrl = 'http://localhost:5000/api/ordenrecibo/';
constructor(private http: HttpClient) { }

getAll(model: any) : Observable<OrdenRecibo[]> {
  let params = "?PropietarioID=" + model.PropietarioId +
  "&EstadoId=" + model.EstadoId +
  "&DaysAgo=" + model.DaysAgo;
  return this.http.get<OrdenRecibo[]>(this.baseUrl + params,httpOptions)


};
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

 obtenerOrden(id: any): Observable<OrdenRecibo> {
  return this.http.get<OrdenRecibo>(this.baseUrl +"GetOrder?Id=" + id, httpOptions);
 }
}