import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estado } from 'src/app/_models/Mantenimiento/Estado';
import { Vehiculo } from 'src/app/_models/Mantenimiento/vehiculo';
import { Proveedor } from 'src/app/_models/Mantenimiento/proveedor';
import { Chofer } from 'src/app/_models/Mantenimiento/chofer';

const httpOptions = {
    headers: new HttpHeaders({
      'Authorization' : 'Bearer ' + localStorage.getItem('token'),
      'Content-Type' : 'application/json'
    }),
}
@Injectable({
    providedIn: 'root'
  })
export class GeneralService {
    baseUrl = 'http://localhost:5000/api/general/';
    constructor(private http: HttpClient) { }

      getAll(TablaId: number) : Observable<Estado[]> {
        return this.http.get<Estado[]>(this.baseUrl + "?TablaId=" + TablaId,httpOptions)
      };


      getVehiculos(placa: string) : Observable<Vehiculo[]> {
        console.log(this.baseUrl +"GetVehiculos?placa=" + placa);
        return this.http.get<Vehiculo[]>(this.baseUrl +"GetVehiculos?placa=" + placa ,httpOptions)
      };
      getProveedores(criterio: string) : Observable<Proveedor[]> {
        console.log(this.baseUrl +"GetProveedor?criterio=" + criterio);
        return this.http.get<Proveedor[]>(this.baseUrl +"GetProveedor?criterio=" + criterio ,httpOptions)
      };
      getChoferes(criterio: string) : Observable<Chofer[]> {
        console.log(this.baseUrl +"GetChofer?criterio=" + criterio);
        return this.http.get<Chofer[]>(this.baseUrl +"GetChofer?criterio=" + criterio ,httpOptions)
      };
}
