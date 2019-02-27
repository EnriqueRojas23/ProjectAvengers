import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rol } from '../_models/rol';
import { PARAMETERS } from '@angular/core/src/util/decorators';
import { Paginarol } from '../_models/paginarol';
import { TreeviewItem } from 'ngx-treeview';
import { map } from 'rxjs/operators';
import { AlertifyService } from './alertify.service';
import { Router } from '@angular/router';
import { RolUser } from '../_models/roluser';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization' : 'Bearer ' + localStorage.getItem('token'),
     'Content-Type' : 'application/json'
  }),
 
}


@Injectable({
  providedIn: 'root'
})  
export class RolService {
  baseUrl = 'http://localhost:5000/api/roles/';
  constructor(private http: HttpClient, ) { }

  getAll() : Observable<Rol[]> {
    return this.http.get<Rol[]>(this.baseUrl, httpOptions);
 }
 
 getPaginas(RolId: any) : Observable<TreeviewItem[]> {
  return this.http.get<TreeviewItem[]>(this.baseUrl+ "obtenermenu?idRol=" + RolId  , httpOptions);
 }

 savePaginas(model: any){
     let body = JSON.stringify(model);    
     return this.http.post(this.baseUrl + 'addoption', body,httpOptions)
  };
  getRolesForUser(UserId: any) : Observable<RolUser[]> {
    return this.http.get<RolUser[]>(this.baseUrl+ "getallroles?UserId=" + UserId,  httpOptions);
 }
 saveRoles(model: any, UserId: any){
  let body = JSON.stringify(model);   
  return this.http.post(this.baseUrl + 'addroluser?UserId=' + UserId, body,httpOptions)
};
}





