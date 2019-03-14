import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Observable } from 'rxjs';
import { OrdenRecibo } from 'src/app/_models/Recepcion/ordenrecibo';
import { Ubicacion } from 'src/app/_models/Mantenimiento/ubicacion';


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
  
  return this.http.post(this.baseUrl + 'register', model,httpOptions);
}
 obtenerOrden(id: any): Observable<OrdenRecibo> {
  return this.http.get<OrdenRecibo>(this.baseUrl +"GetOrder?Id=" + id, httpOptions);
 }
 registrar_detalle(model: any){
  return this.http.post(this.baseUrl + 'register_detail', model,httpOptions)
  .pipe(
    map((response: any) => {
     
    } 
  )
  )};

  vincularEquipoTransporte(model: any){
    return this.http.post(this.baseUrl + 'RegisterEquipoTransporte', model,httpOptions);
  }

   getAllUbicaciones(AlmacenId: number, AreaId: number): Observable<Ubicacion[]> {
    let params = "AlmacenId=" + AlmacenId + "&AreaId=" + AreaId;
    return this.http.get<Ubicacion[]>(this.baseUrl +"GetUbicaciones?" + params, httpOptions);
   }
   assignmentOfDoor(idOrdenRecibo: any , ubicacionId: number ){
     console.log(idOrdenRecibo);
    let model: any = {};
    model.OrdenReciboId = idOrdenRecibo;
    model.ubicacionId = ubicacionId;

    return this.http.post(this.baseUrl + 'assignmentOfDoor', model,httpOptions)
    .pipe(
      map((response: any) => {
       
      } 
    )
    )
   }


}