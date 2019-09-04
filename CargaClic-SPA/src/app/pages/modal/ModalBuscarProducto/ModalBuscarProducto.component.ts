import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Producto } from 'src/app/_models/Mantenimiento/producto';

import { ProductoService } from 'src/app/_services/Mantenimiento/producto.service';
import { OrdenReciboService } from 'src/app/_services/Recepcion/ordenrecibo.service';
import { DialogData } from 'src/app/_models/Common/dialogdata';



@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'ModalBuscarProducto.component.html',
  styleUrls: ['ModalBuscarProducto.component.css'],
})
export class DialogBuscarProducto {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageSizeOptions:number[] = [5, 10, 25, 50, 100];
  displayedColumns: string[] = [ 'Codigo', 'DescripcionLarga', 'actionsColumn' ];
  productos: Producto[];
  listData: MatTableDataSource<Producto>;
  model: any = {};

  constructor(
    public dialogRef: MatDialogRef<DialogBuscarProducto>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private productoService: ProductoService ,
    private ordenReciboService: OrdenReciboService ) {
      this.buscar();

    }
    onNoClick(): void {
    this.dialogRef.close();
    
  }
  seleccionarProducto(row: any){
     
     this.dialogRef.close( this.model.descripcionLarga =this.productos.filter(x => x.id == row)[0]);
  }

  buscar(){
       
        this.model.propietarioId =    this.data.codigo;
        this.productoService.getAll(this.model.codigo,this.model.propietarioId).subscribe(list => {
        this.productos = list;
        this.listData = new MatTableDataSource(this.productos);
        this.listData.paginator = this.paginator;
        this.listData.sort = this.sort;

        this.listData.filterPredicate = (data,filter) => {
          return this.displayedColumns.some(ele => {
            
            if(ele !='Id' && ele != 'enLinea' && ele != 'Dni')
              {
                  return ele != 'actionsColumn' && data[ele].toLowerCase().indexOf(filter) != -1;
            
              }
            })
          }
        });
  
  }
}