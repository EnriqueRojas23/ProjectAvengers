import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
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

@Component({
  selector: 'app-listadocargas',
  templateUrl: './listadocargas.component.html',
  styleUrls: ['./listadocargas.component.css']
})
export class ListadocargasComponent implements OnInit {




  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  pageSizeOptions:number[] = [5, 10, 25, 50, 100];
  displayedColumns: string[] = [ 'select' , 'numCarga' ,'propietario','FechaRegistro','placa' ,'equipotransporte', 'Estado','Cliente','Direccion' ];
  
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
    private clienteService: ClienteService) {


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
    this.model.estadoIdfiltro = 21;
    this.model.PropietarioFiltroId = 1;
    
    this.EstadoId =this.model.estadoIdfiltro;
    this.model.PropietarioId = this.model.PropietarioFiltroId;

    
    this.model.PropietarioId = 1;
    this.model.EstadoId = 25;
    



    this.ordensalidaService.getAllCargas(this.model).subscribe(list => {
      
      this.cargas = list;
      console.log(this.cargas);
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
  asignar() {
     if(this.selection.selected.length > 1)
     {
        this.alertify.warning("Debe seleccionar solo un elemento");
        return;
     } 
    let idcarga = this.selection.selected[0].id ;
    //  this.alertify.success("Se registró correctamente.");
     this.router.navigate(['/despacho/equipotransportesalida', idcarga]);
     
  }
}
