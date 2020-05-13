import { Component, AfterViewInit } from '@angular/core';
import { SidebarService } from '../../_services/sidebar.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
  declare const App: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements  AfterViewInit   {
  constructor(public authService: AuthService,public _sidebar: SidebarService, private router: Router) {
 }
  async ngAfterViewInit() {
     App.init();
  }
  activeRouteMenu(routename: string): boolean {
    return this.router.url.includes(routename) == true;
 }
  activeRoute(routename: string): boolean {
    return this.router.url.indexOf(routename) > -1;
  }
}
async function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}
