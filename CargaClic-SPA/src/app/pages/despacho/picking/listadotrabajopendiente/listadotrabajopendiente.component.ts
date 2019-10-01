import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
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


@Component({
  selector: 'app-listadotrabajopendiente',
  templateUrl: './listadotrabajopendiente.component.html',
  styleUrls: ['./listadotrabajopendiente.component.css']
})
export class ListadoTrabajoPendienteComponent implements OnInit {




  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  pageSizeOptions:number[] = [5, 10, 25, 50, 100];
  displayedColumns: string[] = [ 'select' , 'workNum' ,'propietario','FechaRegistro','FechaAsignacion','FechaTermino', 'Estado', 'ubicacion' , 'CantidadLPN' , 'cantidadTotal' ,'Direccion' ];
  el: any[] = [];
  listData: MatTableDataSource<Carga>;
  public loading = false;
  cargas: Carga[] = [];

  ordenesaux: OrdenSalida[] = [];
  model: any  = {};


  clientes: Dropdownlist[] = [];
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



  constructor(private ordensalidaService: OrdenSalidaService,
    private alertify: AlertifyService ,
    private router: Router,
    public dialog: MatDialog,
    private clienteService: ClienteService,
    public authService: AuthService) {


   }

  ngOnInit() {

    this.clienteService.getAllPropietarios("").subscribe(resp => { 
      resp.forEach(element => {
        this.clientes.push({ val: element.id , viewValue: element.razonSocial});
      });
      this.filteredClientes.next(this.clientes.slice());
      this.ClientesFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
            this.filterBanks();
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
      
      this.loading = false;
      this.listData = new MatTableDataSource(this.cargas);
      this.listData.paginator = this.paginator;
      this.listData.sort = this.sort;
      
        
      this.listData.filterPredicate = (data,filter) => {
        return this.displayedColumns.some(ele => {
          
          if(ele != 'ubicacion' &&  ele != 'select' && ele != 'EquipoTransporte' && ele !='Almacen' && ele != 'Urgente' && ele != 'fechaEsperada' && ele != 'fechaRegistro')
             {
               
                return ele != 'actionsColumn' && data[ele].toLowerCase().indexOf(filter) != -1;
           
             }
          })
         }
      });

  
  
  }
  selection = new SelectionModel<Carga>(true, []);

  protected filterBanks() {
    if (!this.clientes) {
      return;
    }
    let search = this.ClientesFilterCtrl.value;
    if (!search) {
      this.filteredClientes.next(this.clientes.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredClientes.next(
      this.clientes.filter(bank => bank.viewValue.toLowerCase().indexOf(search) > -1)
    );
    
  }
  
  checkSelects() {
    return  this.selection.selected.length > 0 ?  false : true;
  }
  checkboxLabel(row?: Carga): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id+ 1}`;
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows =  this.cargas.length;
    return numSelected === numRows;
  }
 

  asignarPuerta(): void {
   


    if(this.selection.selected.length > 1 || this.selection.selected.length ==  0){
      this.alertify.error("Debe seleccionar solo un Trabajo");
      return ;
    }
    

    const dialogRef = this.dialog.open(DialogAsignarPuerta, {
      width: '700px',
      height: '350px',
      data: {codigo: this.selection.selected, descripcion: ""}
    });
    dialogRef.afterClosed().subscribe(result => {
 
      this.model.PropietarioId = 1;
      this.model.EstadoId = 30;
   
  
  
      this.ordensalidaService.getAllWork(this.model).subscribe(list => {
        
        this.cargas = list;
        this.selection.clear() ;
        this.loading = false;
        this.listData = new MatTableDataSource(this.cargas);
        this.listData.paginator = this.paginator;
        this.listData.sort = this.sort;
          
        this.listData.filterPredicate = (data,filter) => {
          return this.displayedColumns.some(ele => {
            
            if(ele != 'ubicacion' &&  ele != 'select' && ele != 'EquipoTransporte' && ele !='Almacen' && ele != 'Urgente' && ele != 'fechaEsperada' && ele != 'fechaRegistro')
               {
                 
                  return ele != 'actionsColumn' && data[ele].toLowerCase().indexOf(filter) != -1;
             
               }
            })
           }
          
        });
    });
  }
  asignarTrabajador(): void {



    if(this.selection.selected.length > 1 || this.selection.selected.length ==  0){
      this.alertify.error("Debe seleccionar solo un Trabajo");
      return ;
    }

    if(this.selection.selected[0].ubicacion == null)
    {
      this.alertify.error("Debe asignar un Área de Despacho");
      return;
    };
    
    const dialogRef = this.dialog.open(DialogAsignarTrabajador, {
      width: '700px',
      height: '350px',
      data: {codigo: this.selection.selected, descripcion: ""}
    });
    dialogRef.afterClosed().subscribe(result => {
     
      this.model.PropietarioId = 1;
      this.model.EstadoId = 30;
  
      this.ordensalidaService.getAllWork(this.model).subscribe(list => {
        this.cargas = list;
        this.selection.clear() ;
        this.loading = false;
        this.listData = new MatTableDataSource(this.cargas);
        this.listData.paginator = this.paginator;
        this.listData.sort = this.sort;
        
        this.listData.filterPredicate = (data,filter) => {
          return this.displayedColumns.some(ele => {
            if(ele != 'ubicacion' &&  ele != 'select' && ele != 'EquipoTransporte' && ele !='Almacen' && ele != 'Urgente' && ele != 'fechaEsperada' && ele != 'fechaRegistro')
               {
                  return ele != 'actionsColumn' && data[ele].toLowerCase().indexOf(filter) != -1;
               }
            })
           }
           
        });
    });
  }
  highlight(row){
    this.selection.isSelected(row) ? this.selection.deselect(row) : this.selection.select(row)
  }
  masterToggle() {
      this.isAllSelected() ?
        this.selection.clear() :
        this.listData.data.forEach(row => this.selection.select(row));
  }
  buscar(){

  }
  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }
}
