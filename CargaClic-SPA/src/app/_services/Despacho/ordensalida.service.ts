import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { OrdenRecibo, OrdenReciboDetalle } from 'src/app/_models/Recepcion/ordenrecibo';
import { Ubicacion } from 'src/app/_models/Mantenimiento/ubicacion';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { EquipoTransporte } from 'src/app/_models/Recepcion/equipotransporte';
import { environment } from 'src/environments/environment';
import { OrdenSalida } from 'src/app/_models/Despacho/ordenrecibo';
import { Carga } from 'src/app/_models/Despacho/Carga';


const httpOptions = {
  headers: new HttpHeaders({
    'Authorization' : 'Bearer ' + localStorage.getItem('token'),
    'Content-Type' : 'application/json'
  }),
}
  

@Injectable({
  providedIn: 'root'
})
export class OrdenSalidaService {
  baseUrl = environment.baseUrl + '/api/ordensalida/';
constructor(private http: HttpClient) { }


RegistarOrdenSalida(model: any){
  return this.http.post(this.baseUrl + 'RegisterOrdenSalida', model,httpOptions);
}

RegistarPlanificacion(model: any){
  return this.http.post(this.baseUrl + 'RegisterCarga', model,httpOptions);
}



getAllOrdenSalida(model: any) : Observable<OrdenSalida[]> {
  let params = "?PropietarioID=" + model.PropietarioId +
  "&EstadoId=" + model.estadoIdfiltro +
  "&DaysAgo=" + model.intervalo;
  return this.http.get<OrdenSalida[]>(this.baseUrl + "GetAllOrder" + params,httpOptions)
};
getAllCargas(model: any) : Observable<Carga[]> {
  let params = "?PropietarioID=" + model.PropietarioId +
  "&EstadoId=" + model.EstadoId ;
  return this.http.get<Carga[]>(this.baseUrl + "GetAllCargas" + params,httpOptions)
};


getAllByEquipoTransporte(model: any) : Observable<OrdenRecibo[]> {
  let params = "?EquipoTransporteId=" + model.EquipoTransporteId ;
  return this.http.get<OrdenRecibo[]>(this.baseUrl + "GetOrderbyEquipoTransporte" + params,httpOptions)
};

actualizar(model: any){
  return this.http.post(this.baseUrl + 'update', model,httpOptions);
}

obtenerOrden(id: any): Observable<OrdenSalida> {
  return this.http.get<OrdenSalida>(this.baseUrl +"GetOrder?OrdenSalidaId=" + id, httpOptions);
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

matchEquipoTransporte(model: any){
  return this.http.post(this.baseUrl + 'MatchTransporteCarga', model,httpOptions);
}

getEquipoTransporte(placa: string) : Observable<EquipoTransporte> {
  return this.http.get<EquipoTransporte>(this.baseUrl +"GetEquipoTransporte?placa=" + placa ,httpOptions)
};

getAllEquipoTransporte(model:any) : Observable<EquipoTransporte[]> {
  let params = "?PropietarioID=" + model.PropietarioId +
  "&EstadoId=" + model.estadoIdfiltro +
  "&DaysAgo=" + model.intervalo;
  return this.http.get<EquipoTransporte[]>(this.baseUrl + 'ListEquipoTransporte' + params,httpOptions);
}
deleteOrder(id:any) : Observable<OrdenRecibo[]> {
  let params = "?OrdenReciboId=" + id ;
  return this.http.delete<OrdenRecibo[]>(this.baseUrl + 'DeleteOrder' + params,httpOptions);
}
deleteOrderDetail(id:any) : Observable<OrdenRecibo[]> {
  let params = "?id=" + id ;
  return this.http.delete<OrdenRecibo[]>(this.baseUrl + 'DeleteOrderDetail' + params,httpOptions);
}



assignmentOfDoor(EquipoTransporteId: any , ubicacionId: number) {
    let model: any = {};
    model.EquipoTransporteId = EquipoTransporteId;
    model.ubicacionId = ubicacionId;

    return this.http.post(this.baseUrl + 'assignmentOfDoor', model,httpOptions)
    .pipe(
      map((response: any) => {
      } 
    )
)}

obtenerOrdenDetalle(id: any): Observable<OrdenReciboDetalle> {
    return this.http.get<OrdenReciboDetalle>(this.baseUrl +"GetOrderDetail?Id=" + id, httpOptions);
   }

identificar_detalle(model: any){
  return this.http.post(this.baseUrl + 'identify_detail', model,httpOptions)
  .pipe(
    map((response: any) => {
    } 
   )
)};
cerrar_identificacion(Id: any){
  
  let model: any;
  return this.http.post(this.baseUrl + 'close_details?Id='+ Id,model,httpOptions)
  .pipe(
    map((response: any) => {
    } 
   )
)};


}