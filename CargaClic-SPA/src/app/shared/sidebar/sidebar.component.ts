import { Component, AfterViewInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { Router } from '@angular/router';

  // declare var jQuery: any;
  declare const App: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements  AfterViewInit   {
  constructor(public _sidebar: SidebarService, private router: Router) { }

  async ngAfterViewInit() {
//     await delay(1000);
     App.init();
         // jQuery('#side-menu').metisMenu();
  }
  activeRoute(routename: string): boolean {
    // console.log(this.router.url);
    return false;
    return this.router.url.indexOf(routename) > -1;
    return true;
  }
}
async function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}
