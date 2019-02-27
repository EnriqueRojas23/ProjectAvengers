import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/_models/Mantenimiento/cliente';

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
  baseUrl = 'http://localhost:5000/api/cliente/';

constructor(private http: HttpClient) { }

getAll() : Observable<Cliente[]> {
  return this.http.get<Cliente[]>(this.baseUrl,httpOptions)
  };
}
