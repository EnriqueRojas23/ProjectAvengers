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
import { RouterModule } from '@angular/router';
import { UserService } from './_services/user.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTableModule, MatPaginatorModule, MatSortModule, MatDatepickerModule } from '@angular/material';

import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { GeneralService } from './_services/Mantenimiento/general.service';







@NgModule({
   declarations: [
      AppComponent,
      LoginComponent,
      PagesComponent,
      
      
      
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
      AngularDateTimePickerModule
      
   
      
   ],
   providers: [
        AuthService,
        ErrorInterceptorProvide,
        AlertifyService,
        UserService,
      
        
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
