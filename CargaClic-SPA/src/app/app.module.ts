import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Rutas
import { APP_ROUTES } from './app.routes';

import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './login/login.component';
import { AuthService } from './_services/auth.service';
import { SharedModule } from './shared/shared.module';
import { PagesComponent } from './pages/pages.component';
import { ErrorInterceptorProvide } from './_services/error.interceptor';
import { AlertifyService } from './_services/alertify.service';

import { UserService } from './_services/user.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTableModule, MatPaginatorModule, MatSortModule,  } from '@angular/material';


import { AngularDateTimePickerModule } from 'angular2-datetimepicker';

import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { XHRBackend } from '@angular/http';
import { ApiXHRBackend } from './_services/http.interceptor';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AgGridModule } from 'ag-grid-angular';







@NgModule({
   declarations: [
      AppComponent,
      LoginComponent,
      PagesComponent
      
      
      
     ],
   imports: [
      BrowserModule,
      HttpClientModule,
      APP_ROUTES,
      FormsModule,
      SharedModule,
      BrowserAnimationsModule,
      MatTableModule,
      MatPaginatorModule,
      MatSortModule,
      AngularDateTimePickerModule,
      NgxMatSelectSearchModule,
      SweetAlert2Module.forRoot({
         buttonsStyling: false,
         customClass: 'modal-content',
         confirmButtonClass: 'btn btn-primary',
         cancelButtonClass: 'btn'
     })
      
   
      
   ],
   providers: [
        AuthService,
        ErrorInterceptorProvide,
        AlertifyService,
        UserService,
        { provide: XHRBackend, useClass: ApiXHRBackend }
        
      
        
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
