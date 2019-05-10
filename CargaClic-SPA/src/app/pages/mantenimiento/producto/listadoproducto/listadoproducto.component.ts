import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ProductoService } from 'src/app/_services/Mantenimiento/producto.service';
import { Producto } from 'src/app/_models/Mantenimiento/producto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listadoproducto',
  templateUrl: './listadoproducto.component.html',
  styleUrls: ['./listadoproducto.component.css']
})
export class ListadoproductoComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  pageSizeOptions:number[] = [5, 10, 25, 50, 100];
  displayedColumns: string[] = [ 'almacen', 'cliente' ,'familia','codigo','descripcionLarga' ,'actionsColumn' ];

  listData: MatTableDataSource<Producto>;
  public loading = false;
  productos: Producto[];
  model: any  ;


  constructor(private productoService: ProductoService
   , private router: Router ) { }

  ngOnInit() {
    this.loading = true;
    this.model = {
    };
    this.model.criterio = "";
    this.model.clienteId = 1;

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
  verHuellas(id){
    this.router.navigate(['mantenimiento/verproducto']);

  }

}
