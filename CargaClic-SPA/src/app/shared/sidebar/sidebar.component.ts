import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';

  // declare var jQuery: any;
  declare const App: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, AfterViewInit   {
  constructor(public _sidebar: SidebarService) { }
  ngOnInit() {
  }
  ngAfterViewInit() {
     App.init();
    // jQuery('#side-menu').metisMenu();
  }
  activeRoute(routename: string): boolean {
    // return this.router.url.indexOf(routename) > -1;
    return true;
  }

}
