import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/_models/Mantenimiento/cliente';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import {  Departamento, Provincia, Distrito, Ubigeo } from 'src/app/_models/Mantenimiento/Ubigeo';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization' : 'Bearer ' + localStorage.getItem('token'),
    'Content-Type' : 'application/json'
  }),
  
 
}


@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  baseUrl = environment.baseUrl + '/api/cliente/';

constructor(private http: HttpClient) { }

  getAll() : Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.baseUrl,httpOptions)
  };

  get(id) : Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.baseUrl +"Get?id=" + id ,httpOptions)
  };

  getAllClientes(criterio: string) : Observable<Cliente[]> {
  return this.http.get<Cliente[]>(this.baseUrl +"GetAllClientes?criterio="+ criterio ,httpOptions)
  };


  getAllDirecciones(id: number) : Observable<Ubigeo[]> {
    return this.http.get<Ubigeo[]>(this.baseUrl +"GetAllDirecciones?id="+ id ,httpOptions)
    };

  getAllClientesxPropietarios(id: number) : Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.baseUrl +"GetAllClientesxPropietarios?id="+ id ,httpOptions)
    };
  
  getAllPropietarios(criterio: string) : Observable<Cliente[]> {
  return this.http.get<Cliente[]>(this.baseUrl +"GetAllPropietarios?criterio="+ criterio ,httpOptions)
 };

 registrarCliente(model: any){
    return this.http.post(this.baseUrl + 'clientRegister', model, httpOptions)
    .pipe(map((response: any) => {
       console.log(response);
      
    }))  
  };
  registrarOwner(model: any) {
    return this.http.post(this.baseUrl + 'OwnerRegister', model, httpOptions)
    .pipe(map((response: any) => {
       
    }))  
  };
  vincularPropitearioCliente(model: any) {
    return this.http.post(this.baseUrl + 'MatchOwnerClient', model, httpOptions)
    .pipe(map((response: any) => {
       
    }))  
  };
  registrarDireccion(model: any) {
    return this.http.post(this.baseUrl + 'AddressRegister', model, httpOptions)
    .pipe(map((response: any) => {
    }))  
  };

  GetAllDepartamentos() : Observable<Departamento[]> {
  return this.http.get<Departamento[]>(this.baseUrl +"GetAllDepartamentos", httpOptions)
  };
  GetAllProvincias(id: number) : Observable<Provincia[]> {
    return this.http.get<Provincia[]>(this.baseUrl +"GetAllProvincias?DepartamentoId=" + id, httpOptions)
    };
  GetAllDistritos(id: number) : Observable<Distrito[]> {
    return this.http.get<Distrito[]>(this.baseUrl +"GetAllDistritos?ProvinciaId=" + id, httpOptions)
    };
}



