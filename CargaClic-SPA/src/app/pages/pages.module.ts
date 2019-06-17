import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PAGES_ROUTES } from './pages.routes';
import { CommonModule } from '@angular/common';
import { AuthGuard } from '../_guards/auth.guard';
import { ListausuariosComponent, NgbdModalConfirmAutofocus, DialogOverviewExampleDialog } from './seguridad/usuario/listausuarios/listausuarios.component';
import { MatTableModule ,MatButtonModule, MatPaginatorModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSortModule, MatOptionModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatTreeModule, MatCheckboxModule, MatDialogModule, MatError } from '@angular/material';
import { UserService } from '../_services/user.service';
import { NuevousuarioComponent } from './seguridad/usuario/nuevousuario/nuevousuario.component';
import { EditarusuarioComponent } from './seguridad/usuario/editarusuario/editarusuario.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListarolesComponent } from './seguridad/rol/listaroles/listaroles.component';
import { NuevorolComponent } from './seguridad/rol/nuevorol/nuevorol.component';
import { AsignaropcionesComponent } from './seguridad/rol/asignaropciones/asignaropciones.component';
import { TreeviewModule } from 'ngx-treeview';
import { AngularDualListBoxModule } from 'angular-dual-listbox';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { ListaordenreciboComponent } from './prerecibo/ordenrecibo/listaordenrecibo/listaordenrecibo.component';

import { NuevaordenreciboComponent } from './prerecibo/ordenrecibo/nuevaordenrecibo/nuevaordenrecibo.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { NuevaordenrecibodetalleComponent } from './prerecibo/ordenrecibo/nuevaordenrecibodetalle/nuevaordenrecibodetalle.component';
import { VerordenreciboComponent } from './prerecibo/ordenrecibo/verordenrecibo/verordenrecibo.component';
import { OrdenReciboService } from '../_services/Recepcion/ordenrecibo.service';
import { GeneralService } from '../_services/Mantenimiento/general.service';
import { VincularequipotransporteComponent, DialogBuscarPlaca, DialogBuscarEmpTransporte, DialogBuscarChofer } from './prerecibo/equipotransporte/vincularequipotransporte/vincularequipotransporte.component';
import { AsignarpuertaComponent } from './prerecibo/puerta/asignarpuerta/asignarpuerta.component';
import { ListaordenrecibidaComponent } from './recibo/ordenrecibo/listaordenrecibida/listaordenrecibida.component';
import { IdentificarreciboComponent } from './recibo/ordenrecibo/identificarrecibo/identificarrecibo.component';
import { ListadovehiculoComponent } from './mantenimiento/vehiculo/listadovehiculo/listadovehiculo.component';
import { ListadochoferComponent } from './mantenimiento/chofer/listadochofer/listadochofer.component';
import { ListadoproveedorComponent } from './mantenimiento/proveedor/listadoproveedor/listadoproveedor.component';
import { ListadoproductoComponent } from './mantenimiento/producto/listadoproducto/listadoproducto.component';
import { ListadoequipotransporteComponent } from './prerecibo/equipotransporte/listadoequipotransporte/listadoequipotransporte.component';
import { AcomodopalletsComponent } from './recibo/ordenrecibo/acomodopallets/acomodopallets.component';
import { AlmacenamientoComponent, NgbdModalConfirmAlmacenamiento, DialogExcepciones } from './recibo/ordenrecibo/almacenamiento/almacenamiento.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { SpeedDialFabComponent } from './prerecibo/speed-dial-fab/speed-dial-fab.component';
import { Data } from '../_providers/data';
import { ListadoequipotransporteentranteComponent } from './recibo/ordenrecibo/listadoequipotransporteentrante/listadoequipotransporteentrante.component';
import { EditarordenreciboComponent } from './prerecibo/ordenrecibo/editarordenrecibo/editarordenrecibo.component';
import { XHRBackend } from '@angular/http';
import { ApiXHRBackend } from '../_services/http.interceptor';
import { ListadoinventarioComponent } from './inventario/inventariogeneral/listadoinventario/listadoinventario.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NuevoproductoComponent } from './mantenimiento/producto/nuevoproducto/nuevoproducto.component';
import { VerproductoComponent, DialogEditarHuella, DialogNuevoHuella } from './mantenimiento/producto/verproducto/verproducto.component';


import {MatProgressBarModule} from '@angular/material/progress-bar';
import { TwoDigitDecimaNumberDirective } from '../_common/TwoDigitDecimaNumberDirective';
import { NuevahuelladetalleComponent, DialogNuevaHuellaDetalle } from './mantenimiento/producto/nuevahuelladetalle/nuevahuelladetalle.component';
import { AjustesinventarioComponent } from './inventario/inventariogeneral/ajustesinventario/ajustesinventario.component';
import { NuevoajusteComponent } from './inventario/inventariogeneral/nuevoajuste/nuevoajuste.component';
import { AjusteinventariodetalleComponent } from './inventario/inventariogeneral/ajusteinventariodetalle/ajusteinventariodetalle.component';
import { ListaordensalidaComponent } from './despacho/ordensalida/listaordensalida/listaordensalida.component';
import { NuevaordensalidaComponent } from './despacho/ordensalida/nuevaordensalida/nuevaordensalida.component';
import { ListadoclienteComponent, DialogAgregarDireccion } from './mantenimiento/cliente/listadocliente/listadocliente.component';
import { NuevoclienteComponent } from './mantenimiento/cliente/nuevocliente/nuevocliente.component';
import { VerdetalleclienteComponent } from './mantenimiento/cliente/verdetallecliente/verdetallecliente.component';
import { ListadopropietarioComponent, DialogNuevoCliente } from './mantenimiento/propietario/listadopropietario/listadopropietario.component';
import { NuevopropietarioComponent } from './mantenimiento/propietario/nuevopropietario/nuevopropietario.component';
import { NuevaordensalidadetalleComponent } from './despacho/ordensalida/nuevaordensalidadetalle/nuevaordensalidadetalle.component';
import { VerordensalidaComponent } from './despacho/ordensalida/verordensalida/verordensalida.component';
import { DialogBuscarProducto } from './modal/ModalBuscarProducto/ModalBuscarProducto.component';
import { PlanificarcargaComponent } from './despacho/carga/planificarcarga/planificarcarga.component';
import { ListadodespachoComponent } from './despacho/carga/listadodespacho/listadodespacho.component';
import { AgGridModule } from 'ag-grid-angular';
import { EditButtonRendererComponent } from './modal/Edit-button-renderer/Edit-button-renderer.component';
import { ListadocargasComponent } from './despacho/carga/listadocargas/listadocargas.component';
import { EquipotransportesalidaComponent } from './despacho/equipotransportesalida/equipotransportesalida.component';







@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    AccountSettingsComponent,
    ListausuariosComponent,
    NuevousuarioComponent,
    EditarusuarioComponent,
    ListarolesComponent,
    NuevorolComponent,
    AsignaropcionesComponent,
    NgbdModalConfirmAutofocus,
    DialogOverviewExampleDialog,
    DialogBuscarProducto,
    DialogBuscarPlaca,
    DialogBuscarEmpTransporte,
    DialogBuscarChofer,
    NuevaordenreciboComponent,
    ListaordenreciboComponent,
    NuevaordenrecibodetalleComponent,
    VerordenreciboComponent,
    VincularequipotransporteComponent,
    AsignarpuertaComponent,
    ListaordenrecibidaComponent,
    IdentificarreciboComponent,
    ListadovehiculoComponent,
    ListadochoferComponent,
    ListadoproveedorComponent,
    ListadoproductoComponent,
    ListadoequipotransporteComponent,
    AcomodopalletsComponent,
    AlmacenamientoComponent,
    NgbdModalConfirmAlmacenamiento,
    DialogExcepciones,
    SpeedDialFabComponent,
    ListadoequipotransporteentranteComponent,
    EditarordenreciboComponent,
    ListadoinventarioComponent,
    NuevoproductoComponent,
    VerproductoComponent,
    DialogEditarHuella,
    TwoDigitDecimaNumberDirective,
    NuevahuelladetalleComponent,
    DialogNuevoHuella,
    DialogNuevaHuellaDetalle,
    AjustesinventarioComponent,
    AjusteinventariodetalleComponent,
    NuevoajusteComponent ,
    ListaordensalidaComponent,
    NuevaordensalidaComponent,
    ListadoclienteComponent,
    NuevoclienteComponent,
    VerdetalleclienteComponent,
    DialogNuevoCliente,
    ListadopropietarioComponent,
    NuevopropietarioComponent,
    DialogAgregarDireccion,
    NuevaordensalidadetalleComponent,
    VerordensalidaComponent,
    PlanificarcargaComponent,
    ListadodespachoComponent,
    EditButtonRendererComponent,
    ListadocargasComponent,
    EquipotransportesalidaComponent

  ],
  exports: [
      DashboardComponent,
      ProgressComponent,
  ],
  imports: [
    SharedModule,
    PAGES_ROUTES,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTreeModule,
    MatDialogModule,
    MatCheckboxModule,
    NgbModule,
    TreeviewModule.forRoot(),
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.wanderingCubes,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)', 
      backdropBorderRadius: '4px',
      primaryColour: '#ffffff', 
      secondaryColour: '#ffffff', 
      tertiaryColour: '#ffffff'
  }),
    NgxMaterialTimepickerModule.forRoot(),
    AngularDualListBoxModule ,
    AngularDateTimePickerModule,
    NgxMatSelectSearchModule,
    MatSelectModule,
    SweetAlert2Module,
    MatProgressBarModule,
    AgGridModule.withComponents([])
    
  ],
  providers: [
    AuthGuard,
    UserService,
    OrdenReciboService,
    GeneralService,
    Data,
    { provide: XHRBackend, useClass: ApiXHRBackend }
  ],
  entryComponents: [ 
    NgbdModalConfirmAutofocus,
    DialogOverviewExampleDialog, 
    DialogBuscarProducto,
    DialogBuscarPlaca,
    DialogBuscarEmpTransporte,
    DialogBuscarChofer,
    NgbdModalConfirmAlmacenamiento,
    DialogExcepciones,
    DialogEditarHuella,
    DialogNuevoHuella,
    DialogNuevaHuellaDetalle,
    DialogNuevoCliente,
    DialogAgregarDireccion,
    EditButtonRendererComponent
  ],
  
})

export class PagesModule {
}
