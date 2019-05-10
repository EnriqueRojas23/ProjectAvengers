import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/_models/Mantenimiento/cliente';
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
export class ClienteService {
  baseUrl = environment.baseUrl + '/api/cliente/';

constructor(private http: HttpClient) { }

getAll() : Observable<Cliente[]> {
  return this.http.get<Cliente[]>(this.baseUrl,httpOptions)
  };
}
