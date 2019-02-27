import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, DateAdapter, MAT_DATE_FORMATS, MatSort, MatPaginator } from '@angular/material';

import { OrdenReciboService } from 'src/app/_services/Recepcion/ordenrecibo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/pages/graficas1/datepicker.extend';
import { SelectionModel } from '@angular/cdk/collections';
import { OrdenReciboDetalle } from 'src/app/_models/Recepcion/ordenrecibo';


@Component({
  selector: 'app-verordenrecibo',
  templateUrl: './verordenrecibo.component.html',
  styleUrls: ['./verordenrecibo.component.css'],
  providers: [
    {
        provide: DateAdapter, useClass: AppDateAdapter
    },
    {
        provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
    ]
})
export class VerordenreciboComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageSizeOptions:number[] = [5, 10, 25, 50, 100];
  displayedColumns: string[] = ['select', 'Linea', 'actionsColumn' ];
  listData: MatTableDataSource<OrdenReciboDetalle>;
  model: any = {} ;
  public selected2: any;
  searchKey: string;
  id: any;
  date: Date = new Date();
	settings = {
		bigBanner: true,
		timePicker: false,
		format: 'dd-MM-yyyy',
		defaultOpen: true
	}
  constructor(private ordenServicio : OrdenReciboService
    ,private activatedRoute: ActivatedRoute
    ,  private router: Router) { }

  ngOnInit() {
    this.id  = this.activatedRoute.snapshot.params["uid"];
    this.ordenServicio.obtenerOrden(this.id).subscribe(resp => { 
      this.model = resp;
      
      this.listData = new MatTableDataSource(this.model.ordenDetalle);
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
  applyFilter() {
    
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }
  selection = new SelectionModel<OrdenReciboDetalle>(true, []);
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.listData.data.length;
    return numSelected === numRows;
  }

  nuevodetalle(){
  

    // this.OrdenesDetalle.push({
    //    OrdenReciboId:  this.IdNuevaOrden,
    //    Linea: "001",
    //    ProductoId: 1,
    //    Lote: "Lota001",
    //    HuellaId : 1,
    //    EstadoId: 1,
    //    cantidad: 20
    //  })
    

    // localStorage.setItem('IdNuevaOrden' , this.IdNuevaOrden.toString());
    // localStorage.setItem('DetallesOrden' , JSON.stringify(this.OrdenesDetalle));

    this.router.navigate(['/nuevaordenrecibodetalle', this.id]);
    
  }

}
