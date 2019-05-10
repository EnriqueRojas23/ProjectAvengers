import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Ubicacion, Area } from 'src/app/_models/Mantenimiento/ubicacion';
import { InventarioGeneral } from 'src/app/_models/Inventario/inventariogeneral';
import { environment } from 'src/environments/environment';



const httpOptions = {
  headers: new HttpHeaders({
    'Authorization' : 'Bearer ' + localStorage.getItem('token'),
    'Content-Type' : 'application/json'
  }),
}
  

@Injectable({
  providedIn: 'root'
})

export class InventarioService {
  baseUrl =  environment.baseUrl + '/api/inventario/';
  constructor(private http: HttpClient) {

     }

registrar_inventario(model: any) {
    return this.http.post(this.baseUrl + 'register_inventario', model,httpOptions)
    .pipe(
      map((response: any) => {
      } 
    )
)}
asignar_ubicacion (Id:number, UbicacionId: number ){
  //RegisterInventario
  let model: any = {};
  model.Id = Id;
  model.UbicacionId = UbicacionId;

  return this.http.post(this.baseUrl + 'asignar_ubicacion', model,httpOptions)
  .pipe(
    map((response: any) => {
    } 
   )
  )}
  
  terminar_acomodo(Id:number){
    //RegisterInventario
    let model: any = {};
    model.OrdenReciboId = Id;

    return this.http.post(this.baseUrl + 'terminar_acomodo', model,httpOptions)
    .pipe(
      map((response: any) => {
      } 
    )
    )}
    almacenamiento(Id:number){
      //RegisterInventario
      let model: any = {};
      model.Id = Id;
  
      return this.http.post(this.baseUrl + 'almacenamiento', model,httpOptions)
      .pipe(
        map((response: any) => {
        } 
      )
    )};
    

  getAll(LineaId: number): Observable<Ubicacion[]> {
      let params = "Id=" + LineaId ;
      
      return this.http.get<Ubicacion[]>(this.baseUrl +"GetAll?" + params, httpOptions);
  }

  get(InventarioId: number): Observable<InventarioGeneral[]> {
    let params = "Id=" + InventarioId ;
    return this.http.get<InventarioGeneral[]>(this.baseUrl +"get?" + params, httpOptions);
  }

}