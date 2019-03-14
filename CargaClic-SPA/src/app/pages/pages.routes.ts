import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ListausuariosComponent } from './seguridad/usuario/listausuarios/listausuarios.component';
import { NuevousuarioComponent } from './seguridad/usuario/nuevousuario/nuevousuario.component';
import { EditarusuarioComponent } from './seguridad/usuario/editarusuario/editarusuario.component';
import { ListarolesComponent } from './seguridad/rol/listaroles/listaroles.component';
import { NuevorolComponent } from './seguridad/rol/nuevorol/nuevorol.component';
import { AsignaropcionesComponent } from './seguridad/rol/asignaropciones/asignaropciones.component';
import { AuthGuard } from '../_guards/auth.guard';
import { ListaordenreciboComponent } from './prerecibo/ordenrecibo/listaordenrecibo/listaordenrecibo.component';
import { NuevaordenreciboComponent } from './prerecibo/ordenrecibo/nuevaordenrecibo/nuevaordenrecibo.component';
import { NuevaordenrecibodetalleComponent } from './prerecibo/ordenrecibo/nuevaordenrecibodetalle/nuevaordenrecibodetalle.component';
import { VerordenreciboComponent } from './prerecibo/ordenrecibo/verordenrecibo/verordenrecibo.component';
import { VincularequipotransporteComponent } from './prerecibo/equipotransporte/vincularequipotransporte/vincularequipotransporte.component';
import { AsignarpuertaComponent } from './prerecibo/puerta/asignarpuerta/asignarpuerta.component';
import { ListaordenrecibidaComponent } from './recibo/ordenrecibo/listaordenrecibida/listaordenrecibida.component';
import { IdentificarreciboComponent } from './recibo/ordenrecibo/identificarrecibo/identificarrecibo.component';


const pagesRoutes: Routes = [

    {path : 'dashboard', component : DashboardComponent ,} ,
    {path : 'progress', component : ProgressComponent,canActivate: [AuthGuard]} ,
    {path : 'graficas1', component : Graficas1Component ,canActivate: [AuthGuard]} ,
    {path : 'account-settings', component : AccountSettingsComponent, canActivate: [AuthGuard]} ,

    {path : 'listaroles', component : ListarolesComponent , canActivate: [AuthGuard]} ,
    {path : 'nuevorol', component : NuevorolComponent , canActivate: [AuthGuard]} ,
    {path : 'asignaropciones/:uid', component : AsignaropcionesComponent} ,


    {path : 'listausuarios', component : ListausuariosComponent, canActivate: [AuthGuard]} ,
    {path : 'nuevousuario', component : NuevousuarioComponent, canActivate: [AuthGuard]} ,
    {path : 'editarusuario/:uid', component : EditarusuarioComponent, canActivate: [AuthGuard]} ,

    {path : 'nuevaordenrecibo', component : NuevaordenreciboComponent, canActivate: [AuthGuard]} ,
    {path : 'listaordenrecibo', component : ListaordenreciboComponent, canActivate: [AuthGuard]} ,
    {path : 'nuevaordenrecibodetalle/:uid', component : NuevaordenrecibodetalleComponent, canActivate: [AuthGuard]} ,
    {path : 'verordenrecibo/:uid', component : VerordenreciboComponent, canActivate: [AuthGuard]} ,
    {path : 'asignarpuerta/:uid', component : AsignarpuertaComponent, canActivate: [AuthGuard]} ,
    {path : 'vincularequipotransporte/:uid', component : VincularequipotransporteComponent, canActivate: [AuthGuard]} ,



    {path : 'listaordenrecibida', component : ListaordenrecibidaComponent, canActivate: [AuthGuard]} ,
    {path : 'identificarrecibo/:uid', component : IdentificarreciboComponent, canActivate: [AuthGuard]} ,


    {path : '', redirectTo : '/dashboard', pathMatch: 'full'},



    // {path : '**', component : NopagefoundComponent}

];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );

