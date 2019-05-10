import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { OrdenReciboService } from 'src/app/_services/Recepcion/ordenrecibo.service';
import { Router } from '@angular/router';
import { OrdenRecibo } from 'src/app/_models/Recepcion/ordenrecibo';
import { Dropdownlist } from 'src/app/_models/Constantes';
import { SpeedDialFabPosition } from '../../speed-dial-fab/speed-dial-fab.component';
import { Data } from 'src/app/_providers/data';
import { ClienteService } from 'src/app/_services/Mantenimiento/cliente.service';
import { ReplaySubject, Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import swal from'sweetalert2';
import { AlertifyService } from 'src/app/_services/alertify.service';




@Component({
  selector: 'app-listaordenrecibo',
  templateUrl: './listaordenrecibo.component.html',
  styleUrls: ['./listaordenrecibo.component.css']
})
export class ListaordenreciboComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  pageSizeOptions:number[] = [5, 10, 25, 50, 100];
  displayedColumns: string[] = [ 'select','almacen', 'numOrden' ,'propietario','nombreEstado','ubicacion' ,'equipotransporte','fechaEsperada','fechaRegistro','actionsColumn' ];
  
  listData: MatTableDataSource<OrdenRecibo>;
  public loading = false;
  ordenes: OrdenRecibo[] = [];
  model: any;

  clientes: Dropdownlist[] = [];

  titularAlerta: string = '';

  intervalo: Dropdownlist[] = [
    {val: 0, viewValue: 'Desde Siempre'},
    {val: 1, viewValue: 'Hoy'},
    {val: 3, viewValue: 'Hace tres días'},
    {val: 7, viewValue: 'Hace una semana '},
    {val: 31, viewValue: 'Hace un mes '},
  ];
  estados: Dropdownlist[] = [
    {val: 4, viewValue: 'Planeado'},
    {val: 5, viewValue: 'Asignado'},
    {val: 6, viewValue: 'Recibiendo'},
    {val: 12, viewValue: 'Almacenado'},
    
  ];
  public filteredClientes: ReplaySubject<Dropdownlist[]> = new ReplaySubject<Dropdownlist[]>(1);
  public ClientesCtrl: FormControl = new FormControl();
  public ClientesFilterCtrl: FormControl = new FormControl();
  protected _onDestroy = new Subject<void>();

  constructor(private ordenreciboService: OrdenReciboService,
    private router: Router,
    private clienteService: ClienteService,
    private data: Data,
    private alertify: AlertifyService

   ) { }

  ngOnInit() {
    this.loading = true;
    this.model = {
    };
    this.model.intervalo = 3;
    this.model.estadoIdfiltro = 4;
    this.model.PropietarioId = "";

    this.ordenreciboService.getAll(this.model).subscribe(list => {
      
    this.ordenes = list;
    this.loading = false;
    this.listData = new MatTableDataSource(this.ordenes);
    this.listData.paginator = this.paginator;
    this.listData.sort = this.sort;


    this.clienteService.getAll().subscribe(resp => { 
      resp.forEach(element => {
        this.clientes.push({ val: element.id , viewValue: element.nombre});
      });
      this.filteredClientes.next(this.clientes.slice());
      this.ClientesFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
            this.filterBanks();
          });


    });
  
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
  selection = new SelectionModel<OrdenRecibo>(true, []);

  
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
  
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.listData.data.forEach(row => this.selection.select(row));
  }
  selectedRowIndex: number = -1;
  applyFilter() {
    
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

   ver(id){
    this.router.navigate(['/verordenrecibo',id]);
   }
   edit(id){
     
     this.router.navigate(['/editarordenrecibo',id]);
   }
   delete(id){
     
     this.ordenreciboService.deleteOrder(id).subscribe(resp => {

        this.ordenreciboService.getAll(this.model).subscribe(list => {
            
          this.ordenes = list;
          this.loading = false;
          this.listData = new MatTableDataSource(this.ordenes);
          this.listData.paginator = this.paginator;
          this.listData.sort = this.sort;

    });
     }, error => {
       
      if(error = "err020")
      this.alertify.error("Esta Orden de Recibo tiene productos asociados.");
      else
      this.alertify.error("Ocurrió un error inesperado.");

      }, () => { 

        this.listData.filterPredicate = (data,filter) => {
          return this.displayedColumns.some(ele => {
            
            if(ele != 'ubicacion' &&  ele != 'select' && ele != 'EquipoTransporte' && ele !='Almacen' && ele != 'Urgente' && ele != 'fechaEsperada' && ele != 'fechaRegistro')
               {
                 
                  return ele != 'actionsColumn' && data[ele].toLowerCase().indexOf(filter) != -1;
             
               }
            })
           };


        
    });
     

   }


   equipotransporte(){
    let Id = this.selection.selected ;
    this.data.storage = Id;
    this.router.navigate(['/vincularequipotransporte', ""] );
   }
   openDoor(id){
    this.router.navigate(['/asignarpuerta',id]);
   }
   buscar(){


    this.ordenreciboService.getAll(this.model).subscribe(list => {
    this.ordenes = list;

    
     
    this.loading = false;
    this.listData = new MatTableDataSource(this.ordenes);
    this.listData.paginator = this.paginator;
    this.listData.sort = this.sort;

  
    this.listData.filterPredicate = (data,filter) => {
      return this.displayedColumns.some(ele => {
        
        if(ele != 'ubicacion'  && ele != 'select' && ele !='Almacen' && ele != 'Urgente' && ele != 'fechaEsperada' && ele != 'fechaRegistro')
           {
              
              return ele != 'actionsColumn' && data[ele].toLowerCase().indexOf(filter) != -1;
         
           }
        })
       }
    });
   }
   checkboxLabel(row?: OrdenRecibo): string {
  

    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.ordenReciboId + 1}`;
  }
  onSpeedDialFabClicked(btn: {icon: string}) {
    if(btn.icon === 'note_add' ){
      this.router.navigate(['/nuevaordenrecibo']);
    }
  }
  SpeedDialFabPosition = SpeedDialFabPosition;
  speedDialFabColumnDirection = 'column';
  speedDialFabPosition = SpeedDialFabPosition.Top;
  speedDialFabPositionClassName = 'speed-dial-container-top';

  onPositionChange(position: SpeedDialFabPosition) {
    switch(position) {
      case SpeedDialFabPosition.Bottom:
        this.speedDialFabPositionClassName = 'speed-dial-container-bottom';
        this.speedDialFabColumnDirection = 'column-reverse';
        break;
      default:
        this.speedDialFabPositionClassName = 'speed-dial-container-top';
        this.speedDialFabColumnDirection = 'column';
    }
  }
  highlight(row){
    
    this.selection.isSelected(row) ? this.selection.deselect(row) : this.selection.select(row)
    
  }
  checkSelects() {
    
    return  this.selection.selected.length > 0 ?  false : true;
  }
  SelectsCount(){
    
    return  this.selection.selected.length;
  }


}
