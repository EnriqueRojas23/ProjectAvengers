import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SidebarService  {

      menu: any[] = [];
      IdRol: any;
  constructor(private http: HttpClient) {
      this.menu = JSON.parse(localStorage.getItem('menu'));
      
   }

} 
