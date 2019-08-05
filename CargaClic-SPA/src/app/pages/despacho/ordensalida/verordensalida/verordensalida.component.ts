import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { OrdenReciboDetalle } from 'src/app/_models/Recepcion/ordenrecibo';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { SelectionModel } from '@angular/cdk/collections';
import { OrdenSalidaService } from 'src/app/_services/Despacho/ordensalida.service';

@Component({
  selector: 'app-verordensalida',
  templateUrl: './verordensalida.component.html',
  styleUrls: ['./verordensalida.component.css']
})
export class VerordensalidaComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageSizeOptions:number[] = [5, 10, 25, 50, 100];
  displayedColumns: string[] = [ 'Linea', 'Codigo', 'Descripcion' , 'Cantidad', 'Lote' , 'actionsColumn' ];
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
  constructor(private ordenServicio : OrdenSalidaService
    ,private activatedRoute: ActivatedRoute
    ,  private router: Router
    ,private alertify: AlertifyService
    ) { }

  ngOnInit() {
    this.id  = this.activatedRoute.snapshot.params["uid"];

    this.ordenServicio.obtenerOrden(this.id).subscribe(resp => { 

      this.model = resp;
      console.log(this.model);
      
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
    this.router.navigate(['/picking/nuevaordensalidadetalle', this.id]);
  }
  delete(id){
    this.ordenServicio.deleteOrderDetail(id).subscribe(resp => {

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
  regresar(){
    this.router.navigate(['/picking/listaordensalida']);
  }

}
