import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { OrdenSalida } from 'src/app/_models/Despacho/ordenrecibo';
import { Dropdownlist } from 'src/app/_models/Constantes';
import { ReplaySubject, Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { OrdenSalidaService } from 'src/app/_services/Despacho/ordensalida.service';
import { Carga } from 'src/app/_models/Despacho/Carga';
import { ClienteService } from 'src/app/_services/Mantenimiento/cliente.service';
import { takeUntil } from 'rxjs/operators';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';
import { DialogAsignarPuerta } from 'src/app/pages/modal/ModalAsignarPuerta/ModalAsignarPuerta.component';
import { DialogAsignarTrabajador } from 'src/app/pages/modal/ModalAsignarTrabajador/ModalAsignarTrabajador.component';
import { AuthService } from 'src/app/_services/auth.service';
import { SelectItem } from 'primeng/components/common/selectitem';


@Component({
  selector: 'app-listadotrabajopendiente',
  templateUrl: './listadotrabajopendiente.component.html',
  styleUrls: ['./listadotrabajopendiente.component.css']
})
export class ListadoTrabajoPendienteComponent implements OnInit {


  el: any[] = [];
  
  public loading = false;
  cargas: Carga[] = [];

  ordenesaux: OrdenSalida[] = [];
  model: any  = {};

  cols: any[];   
  clientes: SelectItem[] = [];
  EstadoId : number;


  estados: Dropdownlist[] = [
      {val: 21, viewValue: 'Planeado'},
      {val: 5, viewValue: 'Asignado'},
      {val: 6, viewValue: 'Recibiendo'},
    {val: 12, viewValue: 'Almacenado'},
    
  ];
  public filteredClientes: ReplaySubject<Dropdownlist[]> = new ReplaySubject<Dropdownlist[]>(1);
  public ClientesCtrl: FormControl = new FormControl();
  public ClientesFilterCtrl: FormControl = new FormControl();
  protected _onDestroy = new Subject<void>();

  selectedRow: Carga[] = [];


  constructor(private ordensalidaService: OrdenSalidaService,
    private alertify: AlertifyService ,
    private router: Router,
    public dialog: MatDialog,
    private clienteService: ClienteService,
    public authService: AuthService) {


   }

  ngOnInit() {

    this.cols = 
    [
        // {header: 'ACCIONES', field: 'workNum' , width: '100px' },
        {header: 'Almacén', field: 'almacen'  ,  width: '150px' },
        {header: 'N° Trabajo', field: 'workNum'  ,  width: '120px' },
        {header: 'Propietario', field: 'propietario'  , width: '160px'   },
        {header: 'Ubicación', field: 'ubicacion'  , width: '160px'   },
        {header: 'F.Asignación', field: 'fechaAsignacion'  ,  width: '120px'  },
        {header: 'F.Término', field: 'fechaTermino' , width: '120px'  },
        {header: '# Pallets', field: 'cantidadLPN'  , width: '100px'  },
        {header: '# Bultos', field: 'cantidadTotal'  , width: '100px'  },
        {header: 'Estado', field: 'estado',width: '120px'    }, 
        
        
        
  
      ];



    this.clienteService.getAllPropietarios("").subscribe(resp => { 
      resp.forEach(element => {
        this.clientes.push({ value: element.id ,  label : element.razonSocial});
      });

          this.loading = false;


    });



    this.loading = true;
    this.model.intervalo = 3;
    this.model.estadoIdfiltro = 30;
    this.model.PropietarioFiltroId = 1;
    
    
    this.EstadoId =this.model.estadoIdfiltro;
    this.model.PropietarioId = this.model.PropietarioFiltroId;

    
    this.model.PropietarioId = 1;
    this.model.EstadoId = 30;
    



    this.ordensalidaService.getAllWork(this.model).subscribe(list => {
      


      this.cargas = list;

      console.log(this.cargas);
      
      this.loading = false;
    
      
        

      });

  
  
  }



  


  selection = new SelectionModel<Carga>(true, []);
  checkSelects() {
    return  this.selection.selected.length > 0 ?  false : true;
  }

  asignarPuerta(): void {
   
    if(this.selectedRow.length > 1 || this.selectedRow.length ==  0){
      this.alertify.error("Debe seleccionar solo un Trabajo");
      return ;
    }


    //if(this.selection.selected.length > 1 || this.selection.selected.length ==  0){
      // this.alertify.error("Debe seleccionar solo un Trabajo");
      // return ;
    //}
    

    const dialogRef = this.dialog.open(DialogAsignarPuerta, {
      width: '700px',
      height: '350px',
      data: {codigo: this.selectedRow, descripcion: ""}
    });
    dialogRef.afterClosed().subscribe(result => {
 
      //this.model.PropietarioId = 1;
      this.model.EstadoId = 30;
   
  
  
      this.ordensalidaService.getAllWork(this.model).subscribe(list => {
        
        this.cargas = list;
      //  this.selection.clear() ;
        this.loading = false;
        this.selectedRow = [];

          
        });
    });
  }
  asignarTrabajador(): void {

    

    if(this.selectedRow.length > 1 || this.selectedRow.length ==  0){
      this.alertify.error("Debe seleccionar solo un Trabajo");
      return ;
    }

    if(this.selectedRow[0].ubicacion == null)
    {
      this.alertify.error("Debe asignar un Área de Despacho");
      return;
    };
    
    const dialogRef = this.dialog.open(DialogAsignarTrabajador, {
      width: '700px',
      height: '350px',
      data: {codigo: this.selectedRow, descripcion: ""}
    });
    dialogRef.afterClosed().subscribe(result => {
     
     // this.model.PropietarioId = 1;
      this.model.EstadoId = 30;
  
      this.ordensalidaService.getAllWork(this.model).subscribe(list => {
        this.cargas = list;
     //   this.selection.clear() ;
        this.loading = false;
      
        });
    });
  }
  // highlight(row){
  //   this.selection.isSelected(row) ? this.selection.deselect(row) : this.selection.select(row)
  // }

  buscar(){
        

    this.ordensalidaService.getAllWork(this.model).subscribe(list => {
            

      this.cargas = list;
      console.log(this.cargas);
      
      this.loading = false;

      });
  }

}
