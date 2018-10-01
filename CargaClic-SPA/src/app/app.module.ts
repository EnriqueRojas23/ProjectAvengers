import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Rutas
import { APP_ROUTES } from './app.routes';

// Modulos
import { PagesModule } from './pages/pages.module';


import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AuthService } from './_services/auth.service';
// import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
// import { HeaderComponent } from './shared/header/header.component';
// import { SidebarComponent } from './shared/sidebar/sidebar.component';
// import { BreadcrumbsComponent } from './shared/breadcrumbs/breadcrumbs.component';
// import { RightSidebarComponent } from './shared/right-sidebar/right-sidebar.component';



@NgModule({
   declarations: [
      AppComponent,
      LoginComponent,
    //   NopagefoundComponent,
    //   HeaderComponent,
    //   SidebarComponent,
    //   BreadcrumbsComponent,
    //   RightSidebarComponent,
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      APP_ROUTES,
      FormsModule,
      PagesModule
   ],
   providers: [
        AuthService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
