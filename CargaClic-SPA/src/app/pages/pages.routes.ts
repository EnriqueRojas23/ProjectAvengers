import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
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
import { ListadovehiculoComponent } from './mantenimiento/vehiculo/listadovehiculo/listadovehiculo.component';
import { ListadoproveedorComponent } from './mantenimiento/proveedor/listadoproveedor/listadoproveedor.component';
import { ListadochoferComponent } from './mantenimiento/chofer/listadochofer/listadochofer.component';
import { ListadoproductoComponent } from './mantenimiento/producto/listadoproducto/listadoproducto.component';
import { AcomodopalletsComponent } from './recibo/ordenrecibo/acomodopallets/acomodopallets.component';
import { AlmacenamientoComponent } from './recibo/ordenrecibo/almacenamiento/almacenamiento.component';
import { ListadoequipotransporteComponent } from './prerecibo/equipotransporte/listadoequipotransporte/listadoequipotransporte.component';
import { ListadoequipotransporteentranteComponent } from './recibo/ordenrecibo/listadoequipotransporteentrante/listadoequipotransporteentrante.component';
import { EditarordenreciboComponent } from './prerecibo/ordenrecibo/editarordenrecibo/editarordenrecibo.component';
import { ListadoinventarioComponent } from './inventario/inventariogeneral/listadoinventario/listadoinventario.component';
import { NuevoproductoComponent } from './mantenimiento/producto/nuevoproducto/nuevoproducto.component';
import { VerproductoComponent } from './mantenimiento/producto/verproducto/verproducto.component';



const pagesRoutes: Routes = [

    {path : 'dashboard', component : DashboardComponent ,} ,
    {path : 'progress', component : ProgressComponent,canActivate: [AuthGuard]} ,
    {path : 'account-settings', component : AccountSettingsComponent, canActivate: [AuthGuard]} ,

    {path : 'seguridad/listaroles', component : ListarolesComponent , canActivate: [AuthGuard]} ,
    {path : 'seguridad/nuevorol', component : NuevorolComponent , canActivate: [AuthGuard]} ,
    {path : 'seguridad/asignaropciones/:uid', component : AsignaropcionesComponent} ,
    {path : 'seguridad/listausuarios', component : ListausuariosComponent, canActivate: [AuthGuard]} ,
    {path : 'seguridad/nuevousuario', component : NuevousuarioComponent, canActivate: [AuthGuard]} ,
    {path : 'seguridad/editarusuario/:uid', component : EditarusuarioComponent, canActivate: [AuthGuard]} ,

    {path : 'recibo/nuevaordenrecibo', component : NuevaordenreciboComponent, canActivate: [AuthGuard]} ,
    {path : 'recibo/listaordenrecibo', component : ListaordenreciboComponent, canActivate: [AuthGuard]} ,
    {path : 'recibo/equipotransporte', component : ListadoequipotransporteComponent, canActivate: [AuthGuard]} ,
    {path : 'recibo/nuevaordenrecibodetalle/:uid', component : NuevaordenrecibodetalleComponent, canActivate: [AuthGuard]} ,
    {path : 'recibo/verordenrecibo/:uid', component : VerordenreciboComponent, canActivate: [AuthGuard]} ,
    {path : 'recibo/editarordenrecibo/:uid', component : EditarordenreciboComponent, canActivate: [AuthGuard]} ,
    {path : 'recibo/asignarpuerta/:uid', component : AsignarpuertaComponent, canActivate: [AuthGuard]} ,
    {path : 'recibo/vincularequipotransporte/:uid', component : VincularequipotransporteComponent, canActivate: [AuthGuard]} ,
    {path : 'recibo/listaordenrecibida/:uid', component : ListaordenrecibidaComponent, canActivate: [AuthGuard]} ,
    {path : 'recibo/identificarrecibo/:uid/:uid2', component : IdentificarreciboComponent, canActivate: [AuthGuard]} ,
    {path : 'recibo/acomodopallets/:uid/:uid2', component : AcomodopalletsComponent, canActivate: [AuthGuard]} ,
    {path : 'recibo/almacenamiento/:uid/:uid2', component : AlmacenamientoComponent, canActivate: [AuthGuard]} ,
    {path : 'recibo/equipotransporteentrante', component : ListadoequipotransporteentranteComponent, canActivate: [AuthGuard]} ,


    {path : 'listadovehiculo', component : ListadovehiculoComponent, canActivate: [AuthGuard]} ,
    {path : 'listadoproveedor', component : ListadoproveedorComponent, canActivate: [AuthGuard]} ,
    {path : 'listadochofer', component : ListadochoferComponent, canActivate: [AuthGuard]} ,

    {path : 'mantenimiento/listadoproducto', component : ListadoproductoComponent, canActivate: [AuthGuard]} ,
    {path : 'mantenimiento/nuevoproducto', component : NuevoproductoComponent, canActivate: [AuthGuard] } ,
    {path : 'mantenimiento/verproducto', component : VerproductoComponent, canActivate: [AuthGuard]} ,

    {path : 'inventariogeneral', component : ListadoinventarioComponent, canActivate: [AuthGuard]} ,


    {path : '', redirectTo : '/dashboard', pathMatch: 'full'},



    // {path : '**', component : NopagefoundComponent}

];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );

