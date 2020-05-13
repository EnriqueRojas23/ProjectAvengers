import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Ubicacion, Area } from 'src/app/_models/Mantenimiento/ubicacion';
import { InventarioGeneral } from 'src/app/_models/Inventario/inventariogeneral';
import { environment } from 'src/environments/environment';
import { GraficoStock, GraficoRecepcion } from 'src/app/_models/Inventario/GraficoStock';



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
actualizar_inventario(model: any) {
  return this.http.post(this.baseUrl + 'actualizar_inventario', model,httpOptions)
  .pipe(
    map((response: any) => {
    } 
  )
)}
merge_inventario(model: any) {
return this.http.post(this.baseUrl + 'merge_ajuste', model,httpOptions)
  .pipe(
    map((response: any) => {
    } 
  )
)}
asignar_ubicacion (model: InventarioGeneral[] ){
  let body = JSON.stringify(model); 

  return this.http.post(this.baseUrl + 'asignar_ubicacion', body,httpOptions)
  .pipe(
    map((response: any) => {
    } 
   )
  )};
  
  terminar_acomodo(Id:number){
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
    

  getAll(LineaId: number): Observable<InventarioGeneral[]> {
      let params = "Id=" + LineaId ;
      return this.http.get<InventarioGeneral[]>(this.baseUrl +"GetAll?" + params, httpOptions);
  }
  getPallet(id: any): Observable<InventarioGeneral[]> {
    let params = "OrdenReciboId=" + id ;
    return this.http.get<InventarioGeneral[]>(this.baseUrl +"GetPallet?" + params, httpOptions);
  }

  getGraficoStock(PropietarioId: number, AlmacenId: number): Observable<GraficoStock[]> {
    let params = "PropietarioId=" + PropietarioId +
    "&AlmacenId=" + AlmacenId;
    return this.http.get<GraficoStock[]>(this.baseUrl +"GetGraficoStock?" + params, httpOptions);
  }
  getGraficoRecepcion(PropietarioId: number, AlmacenId: number): Observable<GraficoRecepcion[]> {
    let params = "PropietarioId=" + PropietarioId +
    "&AlmacenId=" + AlmacenId;
    return this.http.get<GraficoRecepcion[]>(this.baseUrl +"GetGraficoRecepcion?" + params, httpOptions);
  }

  get(InventarioId: number): Observable<InventarioGeneral[]> {
    let params = "Id=" + InventarioId ;
    return this.http.get<InventarioGeneral[]>(this.baseUrl +"get?" + params, httpOptions);
  }
  getAllInventarioAjusteDetalle(Id: number
   ): Observable<InventarioGeneral[]> {
    let params = "Id=" + Id;
    
    return this.http.get<InventarioGeneral[]>(this.baseUrl +"GetAllInvetarioAjusteDetalle?" + params, httpOptions);
  }
  getAllInventarioAjuste(ClienteId: number
    ,ProductoId: any
    ,EstadoId: number
   ): Observable<InventarioGeneral[]> {
    let params = "ClienteId=" + ClienteId +
    "&ProductoId=" + ProductoId +  
    "&EstadoId=" + EstadoId ;
    
    return this.http.get<InventarioGeneral[]>(this.baseUrl +"GetAllInvetarioAjuste?" + params, httpOptions);
  }
  registrar_ajuste(model: any) {
    return this.http.post(this.baseUrl + 'register_ajuste', model,httpOptions)
    .pipe(
      map((response: any) => {
      } 
    )
  )}

}