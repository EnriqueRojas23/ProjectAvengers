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
import { PreLiquidacion, Serie } from 'src/app/_models/Facturacion/preliquidacion';


const httpOptions = {
  headers: new HttpHeaders({
    'Authorization' : 'Bearer ' + localStorage.getItem('token'),
    'Content-Type' : 'application/json'
  }),
}
  

@Injectable({
  providedIn: 'root'
})
export class FacturacionService {
  baseUrl = environment.baseUrl + '/api/facturacion/';
constructor(private http: HttpClient) { }



getPendientesLiquidacion(id: number) : Observable<PreLiquidacion[]> {
  let params = "?Id=" + id ;
  return this.http.get<PreLiquidacion[]>(this.baseUrl + "GetPendientesLiquidacion" + params,httpOptions)
};
generar_preliquidacion(model: any){
  return this.http.post(this.baseUrl + 'GenerarPreliquidacion',model,httpOptions)
  .pipe(
    map((response: any) => {
    } 
   )
)};

generar_comprobante(model: any){
  return this.http.post(this.baseUrl + 'GenerarComprobante',model,httpOptions)
  .pipe(
    map((response: any) => {
    } 
   )
)};

getPreLiquidaciones(model: any) : Observable<PreLiquidacion[]> {
    let params = "?Id=" + model.PropietarioId ;
    // "&EstadoId=" + model.estadoIdfiltro +
    // "&DaysAgo=" + model.intervalo;
    return this.http.get<PreLiquidacion[]>(this.baseUrl + "GetPreLiquidaciones" + params,httpOptions);
  };
  getPreLiquidacion(id: number) : Observable<PreLiquidacion> {
    let params = "?Id=" + id ;
    return this.http.get<PreLiquidacion>(this.baseUrl + "GetPreLiquidacion" + params,httpOptions);
  };
  getSeries() : Observable<Serie[]> {
    return this.http.get<Serie[]>(this.baseUrl + "GetAllSeries",httpOptions);
  };
 
}