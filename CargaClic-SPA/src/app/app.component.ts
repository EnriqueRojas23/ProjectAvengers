import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService, NgxUiLoaderConfig } from 'ngx-ui-loader';
import { NgxUiLoaderDemoService } from './_services/ngx-ui-loader-demo.service.service';




 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent implements OnInit   {
  title = 'CargaClic-SPA';
  constructor(public demoService: NgxUiLoaderDemoService) {
    
  }
  ngOnInit() {
  }

}
