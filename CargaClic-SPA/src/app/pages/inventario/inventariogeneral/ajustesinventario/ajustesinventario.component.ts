import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { Dropdownlist } from 'src/app/_models/Constantes';
import { ReplaySubject, Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/_services/Mantenimiento/cliente.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { InventarioService } from 'src/app/_services/Inventario/inventario.service';
import { InventarioGeneral } from 'src/app/_models/Inventario/inventariogeneral';
import { SelectionModel } from '@angular/cdk/collections';
import { takeUntil } from 'rxjs/operators';
import { ProductoService } from 'src/app/_services/Mantenimiento/producto.service';
import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';
import { Ubicacion } from 'src/app/_models/Mantenimiento/ubicacion';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/pages/account-settings/datepicker.extend';

declare var $: any;


@Component({
  selector: 'app-ajustesinventario',
  templateUrl: './ajustesinventario.component.html',
  styleUrls: ['./ajustesinventario.component.css'],
  providers: [
    {
        provide: DateAdapter, useClass: AppDateAdapter
    },
    {
        provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
    ]
})
export class AjustesinventarioComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  pageSizeOptions:number[] = [5, 10, 25, 50, 100];
  displayedColumns: string[] = [ 'select', 'lodNum' ,'descripcionLarga', 'area', 'ubicacion', 'ubicacionProxima', 'untQty', 'codigoHuella' ,'actionsColumn' ];


  @ViewChild(MatSort) sort2: MatSort;
  @ViewChild(MatPaginator) paginator2: MatPaginator;
  searchKey2: string;
  pageSizeOptions2:number[] = [5, 10, 25, 50, 100];
  displayedColumns2: string[] = [ 'ubicacion', 'almacen' ,'area', 'sugerido' ,'estado' ,'actionsColumn' ];


  clientes: Dropdownlist[] = [];
  productos: Dropdownlist[] = [];
  estadoInventario: Dropdownlist[] = [];
  ubicaciones: Ubicacion[];

  selection = new SelectionModel<InventarioGeneral>(true, []);

  listData: MatTableDataSource<InventarioGeneral>;
  listUbicaciones: MatTableDataSource<Ubicacion>;

  modeldetail: any = {};
  titularAlerta: string = '';
  model: any = {};
  inventario: InventarioGeneral[] = [];

  intervalo: Dropdownlist[] = [
    {val: 0, viewValue: 'Desde Siempre'},
    {val: 1, viewValue: 'Hoy'},
    {val: 3, viewValue: 'Hace tres días'},
    {val: 7, viewValue: 'Hace una semana '},
    {val: 31, viewValue: 'Hace un mes '},
  ];

  public filteredClientes: ReplaySubject<Dropdownlist[]> = new ReplaySubject<Dropdownlist[]>(1);
  public filteredProductos: ReplaySubject<Dropdownlist[]> = new ReplaySubject<Dropdownlist[]>(1);

  public ClientesCtrl: FormControl = new FormControl();
  public ProductosCtrl: FormControl = new FormControl();


  public ClientesFilterCtrl: FormControl = new FormControl();
  public ProductosFilterCtrl: FormControl = new FormControl();

  protected _onDestroy = new Subject<void>();

  areas: Dropdownlist[] = [
  ];

  
  public loading = false;

  constructor(private router: Router,
    private clienteService: ClienteService,
    private inventarioService: InventarioService,
    private productoService: ProductoService,
    private generalService: GeneralService,
    
    private alertify: AlertifyService) { }

  ngOnInit() {
    this.generalService.getAreas().subscribe(resp=>
      {
        
        
        resp.forEach(element => {
          this.areas.push({
            val: element.id ,
            viewValue: element.nombre
          })
        });
      });

    this.generalService.getAll(3).subscribe(resp=>
      {
        
        resp.forEach(element => {
          this.estadoInventario.push({
            val: element.id ,
            viewValue: element.nombreEstado
          })
        });
      });

    this.clienteService.getAllPropietarios('').subscribe(resp => { 
      resp.forEach(element => {
        this.clientes.push({ val: element.id , viewValue: element.razonSocial});
      });
      this.filteredClientes.next(this.clientes.slice());
      this.ClientesFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
            this.filterBanks();
          });


    });
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
  buscar(){

    this.inventarioService.getAllInventarioAjuste(this.model.ClienteId
      , this.model.ProductoId
      ,this.model.estadoIdfiltro
      ).subscribe(list => {

    this.inventario = list;
    this.loading = false;
    this.listData = new MatTableDataSource(this.inventario);
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
  checkSelects() {
    return  this.selection.selected.length > 0 ?  false : true;
  }
  checkboxLabel(row?: InventarioGeneral): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows =  this.inventario.length;
    return numSelected === numRows;
  }
  highlight(row){
    this.selection.isSelected(row) ? this.selection.deselect(row) : this.selection.select(row)
  }
  CambioCliente(id){
     this.productoService.getAll("",id).subscribe(resp=> {
       

      resp.forEach(element => {
        this.productos.push({ val: element.id , viewValue: element.descripcionLarga});
      });  

      this.filteredProductos.next(this.productos.slice());
      this.ProductosFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
            this.filterProductos();
          });




     })
  }
  protected filterProductos() {
    if (!this.productos) {
      return;
    }
    let search = this.ProductosFilterCtrl.value;
    if (!search) {
      this.filteredProductos.next(this.productos.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredProductos.next(
      this.productos.filter(bank => bank.viewValue.toLowerCase().indexOf(search) > -1)
    );
  }
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.listData.data.forEach(row => this.selection.select(row));
  }
  edit(id){
    this.router.navigate(["/inventario/nuevoajuste", id]);
  }
  merge(){
    let ids = '';
    this.selection.selected.forEach(ele => 
      ids = ids + ele.id.toString() + ','
    )

    ids = ids.substring(0,ids.length -1);
    this.model.ids = ids;
    this.model.UsuarioId = 1;
    console.log(this.model);
    this.inventarioService.merge_inventario(this.model).subscribe(resp => 
      {
          this.buscar();
      })
     
  }
  ver(id){
    this.router.navigate(["/inventario/ajusteinventariodetalle", id]);
  }
  identificar(id){
    this.inventarioService.get(id).subscribe(resp => {
      this.modeldetail =  resp;

      $("html,body").animate({ scrollTop: 4500 }, "slow");
  })

}
  asignarUbicacion(id){
  
    // this.inventarioService.asignar_ubicacion(this.modeldetail.id,id).subscribe(resp => { 
    // }, error => {
       
    // }, () => { 
     
      
    //   this.generalService.getAllUbicaciones(1,this.model.areaId).subscribe(list => {
    //     this.ubicaciones = list;
        
    //   //this.loading = false;
    //   this.listUbicaciones = new MatTableDataSource(this.ubicaciones);
    //   this.listUbicaciones.paginator = this.paginator2;
    //   this.listUbicaciones.sort = this.sort2;
  
  
    //   this.listUbicaciones.filterPredicate = (data,filter) => {
    //     return this.displayedColumns.some(ele => {
          
    //       if(ele != 'EquipoTransporte' && ele !='Almacen' && ele != 'Urgente' && ele != 'fechaEsperada' && ele != 'fechaRegistro')
    //          {
    //             return ele != 'actionsColumn' && data[ele].toLowerCase().indexOf(filter) != -1;
           
    //          }
    //       })
    //      }
    //   });
  
    //   let areatemp =  this.model.areaId;
    //   this.inventarioService.getAll(id).subscribe(resp => { 
    //     this.model = resp;
        
    //     this.listData = new MatTableDataSource(this.model);
    //     this.listData.paginator = this.paginator;
    //     this.listData.sort = this.sort;
        
    //     this.listData.filterPredicate = (data,filter) => {
    //       return this.displayedColumns.some(ele => {
            
    //         if(ele !='Id' && ele != 'activo' && ele != 'publico')
    //            {
    //               return ele != 'actionsColumn' && data[ele].toLowerCase().indexOf(filter) != -1;
             
    //            }
    //         })
    //        }
    //        this.model.areaId = areatemp;
        
    //   }, error => {
         
    //   }, () => { 
            
    //   });
    //   $("html,body").animate({ scrollTop: 0 }, "slow");
  
    // });
   }
   onChange(value){
    

    this.generalService.getAllUbicaciones(1,value.value).subscribe(list => {
      this.ubicaciones = list;
      
    //this.loading = false;
    this.listUbicaciones = new MatTableDataSource(this.ubicaciones);
    this.listUbicaciones.paginator = this.paginator2;
    this.listUbicaciones.sort = this.sort2;


    this.listUbicaciones.filterPredicate = (data,filter) => {
      return this.displayedColumns.some(ele => {
        
        if(ele != 'EquipoTransporte' && ele !='Almacen' && ele != 'Urgente' && ele != 'fechaEsperada' && ele != 'fechaRegistro')
           {
              return ele != 'actionsColumn' && data[ele].toLowerCase().indexOf(filter) != -1;
         
           }
        })
       }
    });
    $("html,body").animate({ scrollTop: 2500 }, "slow");


}
applyFilter() {
    
  this.listData.filter = this.searchKey.trim().toLowerCase();
}
}
