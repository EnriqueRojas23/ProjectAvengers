import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from 'src/app/_models/Mantenimiento/producto';
import { Huella, HuellaDetalle } from 'src/app/_models/Mantenimiento/huella';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

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
    baseUrl = environment.baseUrl + '/api/producto/';

constructor(private http: HttpClient) { }
getAll(criterio: string, ClienteId: number) : Observable<Producto[]> {
  return this.http.get<Producto[]>(this.baseUrl + "?criterio=" + criterio 
    + "&ClienteId=" + ClienteId, httpOptions)
};
get(ProductoId: number) : Observable<Producto[]> {
  return this.http.get<Producto[]>(this.baseUrl + "Get?ProductId=" + ProductoId , httpOptions)
};
getHuellas(ProductoId: any){
  return this.http.get<Huella[]>(this.baseUrl + "GetHuellas?ProductoId=" + ProductoId, httpOptions)
};
getHuella(HuellaId: number){
  return this.http.get<Huella[]>(this.baseUrl + "GetHuella?HuellaId=" + HuellaId, httpOptions)
};
getHuellasDetalle(HuellaId: number){
  return this.http.get<HuellaDetalle[]>(this.baseUrl + "GetHuellasDetalle?HuellaId=" + HuellaId, httpOptions)
};
registrarProducto(model: any){
  return this.http.post(this.baseUrl + 'productRegister', model, httpOptions)
  .pipe(map((response: any) => {
     console.log(response);
    
  }))  
};
editarProducto(model: any){
  return this.http.post(this.baseUrl + 'productEdit', model, httpOptions)
  .pipe(map((response: any) => {
     console.log(response);
    
  }))  
};
registrarHuellaDetalle(model: any){
  return this.http.post(this.baseUrl + 'HuellaDetalleRegister', model, httpOptions)
  .pipe(map((response: any) => {
     console.log(response);
    
  }));  
};
registrarHuella(model: any){
  console.log(model);
  return this.http.post(this.baseUrl + 'HuellaRegister', model, httpOptions)
  .pipe(map((response: any) => {
     console.log(response);
    
  }));  
};
deleteHuellaDetalle(id: number){
  return this.http.delete(this.baseUrl + 'HuellaDetalleDelete?id=' + id, httpOptions)
  .pipe(map((response: any) => {

  }))
}


}