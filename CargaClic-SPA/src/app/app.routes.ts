import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages/pages.component';

import { LoginComponent } from './login/login.component';

import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { AuthGuard } from './_guards/auth.guard';



const appRoutes: Routes = [

   {path : 'login', component : LoginComponent} ,
   {
        path: '',
        component: PagesComponent,
        canActivate: [AuthGuard],
        loadChildren: './pages/pages.module#PagesModule'
    },
    { path: '**', component: NopagefoundComponent },

];

export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash : true } );
