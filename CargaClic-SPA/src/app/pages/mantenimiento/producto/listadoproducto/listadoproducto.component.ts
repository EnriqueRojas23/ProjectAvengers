import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ProductoService } from 'src/app/_services/Mantenimiento/producto.service';
import { Producto } from 'src/app/_models/Mantenimiento/producto';
import { Router } from '@angular/router';
import { ReplaySubject, Subject } from 'rxjs';
import { Dropdownlist } from 'src/app/_models/Constantes';
import { FormControl } from '@angular/forms';
import { ClienteService } from 'src/app/_services/Mantenimiento/cliente.service';
import { takeUntil } from 'rxjs/operators';
import { SelectItem } from 'primeng/components/common/selectitem';

@Component({
  selector: 'app-listadoproducto',
  templateUrl: './listadoproducto.component.html',
  styleUrls: ['./listadoproducto.component.css']
})
export class ListadoproductoComponent implements OnInit {

  clientes: SelectItem[] = [];

  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  pageSizeOptions:number[] = [5, 10, 25, 50, 100];
  displayedColumns: string[] = [ 'almacen', 'cliente' ,'familia','codigo','descripcionLarga' ,'actionsColumn' ];

  listData: MatTableDataSource<Producto>;
  public loading = false;
  productos: Producto[];
  //clientes: Dropdownlist[] = [];
  model: any  ;

  public filteredClientes: ReplaySubject<Dropdownlist[]> = new ReplaySubject<Dropdownlist[]>(1);
  public ClientesCtrl: FormControl = new FormControl();
  public ClientesFilterCtrl: FormControl = new FormControl();
  protected _onDestroy = new Subject<void>();
  
  constructor(private productoService: ProductoService
   , private router: Router 
   ,   private clienteService: ClienteService,) { }

  ngOnInit() {
    
    this.model = {
    };
    this.clienteService.getAllPropietarios("").subscribe(resp => { 

      resp.forEach(x=> {
        this.clientes.push({ label: x.razonSocial , value: x.id.toString() });
     })

     if( localStorage.getItem('searchPro1') != undefined){
      this.model.PropietarioId = localStorage.getItem('searchPro1');
      this.buscar();

    }
  });

  

 


    
    // this.productoService.getAll(this.model.criterio, 1).subscribe(list=> {
    //   this.productos = list ;
     
    //   this.loading = false;
    //   this.listData = new MatTableDataSource(this.productos);
    //   this.listData.paginator = this.paginator;
    //   this.listData.sort = this.sort;

    
      
    // this.listData.filterPredicate = (data,filter) => {
    //   return this.displayedColumns.some(ele => {
        
    //     if(ele != 'almacen' && ele !='cliente' && ele != 'familia' )
    //        {
            
    //           return ele != 'actionsColumn' && data[ele].toLowerCase().indexOf(filter) != -1;
    //        }
    //     })
    //    }
    // });




  }
  verHuellas(id){
    this.router.navigate(['mantenimiento/verproducto', id]);

  }
  edit(id){
    this.router.navigate(['mantenimiento/editarproducto', id]);
  }
  buscar(){

    
      window.localStorage.setItem(
        'searchPro1',
        this.model.PropietarioId
     );


    this.loading = true;

    this.model.criterio = "";
    this.model.clienteId = this.model.PropietarioId;

    
    
   

    
    this.productoService.getAll(this.model.criterio, this.model.clienteId).subscribe(list=> {
      this.productos = list ;
      this.loading = false;
      this.listData = new MatTableDataSource(this.productos);
      this.listData.paginator = this.paginator;
      this.listData.sort = this.sort;

    
      
    this.listData.filterPredicate = (data,filter) => {
      return this.displayedColumns.some(ele => {
        
        if(ele != 'almacen' && ele !='cliente' && ele != 'familia' )
           {
            
              return ele != 'actionsColumn' && data[ele].toLowerCase().indexOf(filter) != -1;
           }
        })
       }
    });
  }
  // protected filterBanks() {
  //   if (!this.clientes) {
  //     return;
  //   }
  //   let search = this.ClientesFilterCtrl.value;
  //   if (!search) {
  //     this.filteredClientes.next(this.clientes.slice());
  //     return;
  //   } else {
  //     search = search.toLowerCase();
  //   }
  //   this.filteredClientes.next(
  //     this.clientes.filter(bank => bank.viewValue.toLowerCase().indexOf(search) > -1)
  //   );
    
  // }

}
