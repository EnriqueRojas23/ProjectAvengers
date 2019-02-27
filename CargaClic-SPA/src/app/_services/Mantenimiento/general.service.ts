import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estado } from 'src/app/_models/Mantenimiento/Estado';

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


}