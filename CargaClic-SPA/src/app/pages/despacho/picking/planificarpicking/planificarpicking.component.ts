import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { OrdenSalida } from 'src/app/_models/Despacho/ordenrecibo';
import { Dropdownlist } from 'src/app/_models/Constantes';
import { ReplaySubject, Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { OrdenSalidaService } from 'src/app/_services/Despacho/ordensalida.service';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/_services/Mantenimiento/cliente.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { takeUntil } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';


@Component({
  selector: 'app-planificarpicking',
  templateUrl: './planificarpicking.component.html',
  styleUrls: ['./planificarpicking.component.css']
})
export class PlanificarpickingComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  pageSizeOptions:number[] = [5, 10, 25, 50, 100];
  displayedColumns: string[] = [ 'select', 'numOrden' ,'propietario','nombreEstado','guiaRemision' ,'equipotransporte', 'placa','fechaRequerida','horaRequerida','fechaRegistro' ];
  
  listData: MatTableDataSource<OrdenSalida>;
  public loading = false;
  ordenes: OrdenSalida[] = [];

  ordenesaux: OrdenSalida[] = [];
  model: any  = {};
  ids: string = "";
  idsCarga: string[] = [];
  model_pendientes: any = {};



  @ViewChild(MatSort) sort1: MatSort;
  @ViewChild(MatPaginator) paginator1: MatPaginator;
  searchKey1: string;
  
  displayedColumns1: string[] = [  'numOrden' ,'propietario','nombreEstado','guiaRemision' ,'equipotransporte', 'placa','fechaRequerida','horaRequerida','fechaRegistro','actionsColumn' ];
  ordeneseleccionadas: OrdenSalida[] = [];
  listData1: MatTableDataSource<OrdenSalida>;









  
  clientes: Dropdownlist[] = [];
  EstadoId : number;

  intervalo: Dropdownlist[] = [
    {val: 1, viewValue: 'Mañana'},
    {val: 3, viewValue: 'Próximos 3 días'},
    {val: 7, viewValue: 'Próximos 7 días'},
    {val: 30, viewValue: 'Próximos 30 días'},
    {val: 0, viewValue: 'Todas'},
  ];
  // estados: Dropdownlist[] = [
  //     {val: 21, viewValue: 'Planeado'},
  //     {val: 5, viewValue: 'Asignado'},
  //     {val: 6, viewValue: 'Recibiendo'},
  //   {val: 12, viewValue: 'Almacenado'},
    
  // ];
  public filteredClientes: ReplaySubject<Dropdownlist[]> = new ReplaySubject<Dropdownlist[]>(1);
  public ClientesCtrl: FormControl = new FormControl();
  public ClientesFilterCtrl: FormControl = new FormControl();
  protected _onDestroy = new Subject<void>();




  constructor(private ordensalidaService: OrdenSalidaService,
    private router: Router,
    private clienteService: ClienteService,
    private alertify: AlertifyService
    ) { }

  ngOnInit() {
    this.loading = true;
    this.model.intervalo = 0;
    this.model.estadoIdfiltro = 20;
    this.model.PropietarioId = 1;
    
    
    this.EstadoId =this.model.estadoIdfiltro;
    //this.model.PropietarioId = this.model.PropietarioFiltroId;


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
    this.model.PropietarioFiltroId = 1;


  }
  selection = new SelectionModel<OrdenSalida>(true, []);
  checkSelects() {
    return  this.selection.selected.length > 0 ?  false : true;
  }
  checkboxLabel(row?: OrdenSalida): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.ordenSalidaId + 1}`;
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows =  this.ordenes.length;
    return numSelected === numRows;
  }
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
  ver(id){
    this.router.navigate(['/picking/verordensalida',id]);
   }
   highlight(row){
    this.selection.isSelected(row) ? this.selection.deselect(row) : this.selection.select(row);
  }
  agregarorden() {
    let Id = this.selection.selected ;
    

    Id.forEach(element => {
      this.ordeneseleccionadas.push(element);  
      const index = this.ordenes.indexOf(element);
      this.ordenes.splice(index, 1);

    });

     
     this.loading  = false;
     this.listData1 = new MatTableDataSource(this.ordeneseleccionadas);
     this.listData1.paginator = this.paginator;
     this.listData1.sort = this.sort;
 
     this.listData1.filterPredicate = (data,filter) => {
       return this.displayedColumns.some(ele => {
         
         if(ele != 'almacen' && ele !='cliente' && ele != 'familia' )
            {
             
               return ele != 'actionsColumn' && data[ele].toLowerCase().indexOf(filter) != -1;
            }
         })
      }
     



     
     this.loading = false;
     this.listData = new MatTableDataSource(this.ordenes);
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
        this.selection.clear() ;
    
  }
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.listData.data.forEach(row => this.selection.select(row));
  }
  eliminar(Id){
    
    

   
      const index = this.ordeneseleccionadas.indexOf(Id);
      this.ordeneseleccionadas.splice(index, 1);
      this.ordenes.push(Id);  
 

     
     this.loading  = false;
     this.listData1 = new MatTableDataSource(this.ordeneseleccionadas);
     this.listData1.paginator = this.paginator;
     this.listData1.sort = this.sort;
 
     this.listData1.filterPredicate = (data,filter) => {
       return this.displayedColumns.some(ele => {
         
         if(ele != 'almacen' && ele !='cliente' && ele != 'familia' )
            {
             
               return ele != 'actionsColumn' && data[ele].toLowerCase().indexOf(filter) != -1;
            }
         })
      }
     



     
     this.loading = false;
     this.listData = new MatTableDataSource(this.ordenes);
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
        this.selection.clear() ;
  }
  planificar(){
    
    this.ordeneseleccionadas.forEach( element => {
      this.ids  = this.ids + ',' + String(element.ordenSalidaId);
    });
    this.model_pendientes.ids = this.ids;
    
    this.ordensalidaService.PlanificarPicking(this.model_pendientes).subscribe(resp => {
        this.model = resp;
        this.loading = false;
      }, error => {
         this.alertify.error(error);
      }, () => { 
        this.alertify.success("Se planificó correctamente.");
        this.router.navigate(['/picking/confirmarpicking' ]);
      });
    
  
  }
  buscar (){
    this.ordensalidaService.getAllOrdenSalidaPendientes(this.model).subscribe(list => {
      
     console.log(list);

    this.ordenes = list;
    this.loading = false;
    this.listData = new MatTableDataSource(this.ordenes);
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
  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }
}
