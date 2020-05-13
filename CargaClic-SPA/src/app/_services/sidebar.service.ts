import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, filter } from 'rxjs/operators';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService  {
        menu: any[] ;
    constructor(private http: HttpClient,private router: Router) {
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } 
}
