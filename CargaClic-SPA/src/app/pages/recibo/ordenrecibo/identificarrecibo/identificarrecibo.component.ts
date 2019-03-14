import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { OrdenReciboDetalle } from 'src/app/_models/Recepcion/ordenrecibo';
import { OrdenReciboService } from 'src/app/_services/Recepcion/ordenrecibo.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-identificarrecibo',
  templateUrl: './identificarrecibo.component.html',
  styleUrls: ['./identificarrecibo.component.css']
})
export class IdentificarreciboComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageSizeOptions:number[] = [5, 10, 25, 50, 100];
  displayedColumns: string[] = [ 'Linea', 'Codigo', 'Descripcion' , 'Cantidad', 'Lote' , 'actionsColumn' ];
  listData: MatTableDataSource<OrdenReciboDetalle>;
  model: any = {} ;
  public selected2: any;
  searchKey: string;
  id: any;
  
  constructor(private ordenServicio : OrdenReciboService
    ,private activatedRoute: ActivatedRoute
    ,  private router: Router) { }

  ngOnInit() {
    this.id  = this.activatedRoute.snapshot.params["uid"];
    this.ordenServicio.obtenerOrden(this.id).subscribe(resp => { 
      this.model = resp;
      
      
      this.listData = new MatTableDataSource(this.model.detalles);
      this.listData.paginator = this.paginator;
      this.listData.sort = this.sort;
      
      this.listData.filterPredicate = (data,filter) => {
        return this.displayedColumns.some(ele => {
          
          if(ele !='Id' && ele != 'activo' && ele != 'publico')
             {
                return ele != 'actionsColumn' && data[ele].toLowerCase().indexOf(filter) != -1;
           
             }
          })
         }
      
    }, error => {
       
    }, () => { 
          
    });
  }

}
