import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PAGES_ROUTES } from './pages.routes';
import { CommonModule } from '@angular/common';
import { AuthGuard } from '../_guards/auth.guard';
import { ListausuariosComponent, NgbdModalConfirmAutofocus, DialogOverviewExampleDialog } from './seguridad/usuario/listausuarios/listausuarios.component';
import { MatTableModule ,MatButtonModule, MatPaginatorModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSortModule, MatOptionModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatTreeModule, MatCheckboxModule, MatDialogModule } from '@angular/material';
import { UserService } from '../_services/user.service';
import { NuevousuarioComponent } from './seguridad/usuario/nuevousuario/nuevousuario.component';
import { EditarusuarioComponent } from './seguridad/usuario/editarusuario/editarusuario.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ListarolesComponent } from './seguridad/rol/listaroles/listaroles.component';
import { NuevorolComponent } from './seguridad/rol/nuevorol/nuevorol.component';
import { AsignaropcionesComponent } from './seguridad/rol/asignaropciones/asignaropciones.component';
import { TreeviewModule } from 'ngx-treeview';
import { AngularDualListBoxModule } from 'angular-dual-listbox';
import { NgxLoadingModule } from 'ngx-loading';
import { ListaordenreciboComponent } from './prerecibo/ordenrecibo/listaordenrecibo/listaordenrecibo.component';

import { NuevaordenreciboComponent } from './prerecibo/ordenrecibo/nuevaordenrecibo/nuevaordenrecibo.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { NuevaordenrecibodetalleComponent, DialogBuscarProducto } from './prerecibo/ordenrecibo/nuevaordenrecibodetalle/nuevaordenrecibodetalle.component';
import { VerordenreciboComponent } from './prerecibo/ordenrecibo/verordenrecibo/verordenrecibo.component';
import { OrdenReciboService } from '../_services/Recepcion/ordenrecibo.service';
import { GeneralService } from '../_services/Mantenimiento/general.service';

 





@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
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
    NuevaordenreciboComponent,
    ListaordenreciboComponent,
    NuevaordenrecibodetalleComponent,
    VerordenreciboComponent
    
  

  ],
  exports: [
      DashboardComponent,
      ProgressComponent,
      Graficas1Component,
      
      
      
  ],
  imports: [
    SharedModule,
    PAGES_ROUTES,
    FormsModule,
    CommonModule,

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
    NgxLoadingModule.forRoot({}),
    NgxMaterialTimepickerModule.forRoot(),
    AngularDualListBoxModule ,
    AngularDateTimePickerModule,
    
    
    
  ],
  providers: [
    AuthGuard,
    UserService,
    OrdenReciboService,
    GeneralService
  ],
  entryComponents: [ NgbdModalConfirmAutofocus,DialogOverviewExampleDialog, DialogBuscarProducto],
  
})

export class PagesModule {
}
