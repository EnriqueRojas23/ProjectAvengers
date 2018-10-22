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
   ],
   providers: [
        AuthService,
        ErrorInterceptorProvide,
        AlertifyService,
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
