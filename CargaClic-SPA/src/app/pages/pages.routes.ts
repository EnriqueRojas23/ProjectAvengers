import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ListausuariosComponent } from './seguridad/usuario/listausuarios/listausuarios.component';
import { NuevousuarioComponent } from './seguridad/usuario/nuevousuario/nuevousuario.component';
import { EditarusuarioComponent } from './seguridad/usuario/editarusuario/editarusuario.component';


const pagesRoutes: Routes = [

    {path : 'dashboard', component : DashboardComponent } ,
    {path : 'progress', component : ProgressComponent} ,
    {path : 'graficas1', component : Graficas1Component} ,
    {path : 'account-settings', component : AccountSettingsComponent} ,
    {path : 'listausuarios', component : ListausuariosComponent} ,
    {path : 'nuevousuario', component : NuevousuarioComponent} ,
    {path : 'editarusuario/:uid', component : EditarusuarioComponent} ,
    {path : '', redirectTo : '/dashboard', pathMatch: 'full'},
    // {path : '**', component : NopagefoundComponent}

];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );

