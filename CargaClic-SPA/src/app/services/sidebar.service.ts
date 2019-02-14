import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  baseUrl = 'http://localhost:5000/api/seguridad/';
      menu: any[] = [];
      IdRol: any;
  constructor(private http: HttpClient) {
      this.menu = JSON.parse(localStorage.getItem('menu'));
   }
}
