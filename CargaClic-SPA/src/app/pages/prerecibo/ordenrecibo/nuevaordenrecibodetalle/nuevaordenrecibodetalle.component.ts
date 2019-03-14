import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/pages/graficas1/datepicker.extend';
import { OrdenRecibo } from 'src/app/_models/Recepcion/ordenrecibo';
import { ProductoService } from 'src/app/_services/Mantenimiento/producto.service';
import { Producto } from 'src/app/_models/Mantenimiento/producto';
import { Dropdownlist } from 'src/app/_models/Constantes';
import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';
import { NgForm } from '@angular/forms';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { OrdenReciboService } from 'src/app/_services/Recepcion/ordenrecibo.service';
import { ActivatedRoute, Router } from '@angular/router';

export interface DialogData {
  codigo: any;
  descripcion: string;
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'modal.buscarproducto.html',
  styleUrls: ['./nuevaordenrecibodetalle.component.css'],
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
      

    }
    onNoClick(): void {
    this.dialogRef.close();
    
  }
  seleccionarProducto(row: any){

     
     //console.log( this.model.descripcionLarga =this.productos.filter(x => x.id == row)[0]);
     this.dialogRef.close( this.model.descripcionLarga =this.productos.filter(x => x.id == row)[0]);

  }

  buscar(){
    this.ordenReciboService.obtenerOrden(this.data.codigo).subscribe(x=> {
      
       this.model.propietarioId =    x.propietarioId;
   

        this.productoService.getAll(this.model.codigo,this.model.propietarioId).subscribe(list => {
        
        this.productos = list;
        //this.loading = false;
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
  })


  }
}

@Component({
  selector: 'app-nuevaordenrecibodetalle',
  templateUrl: './nuevaordenrecibodetalle.component.html',
  styleUrls: ['./nuevaordenrecibodetalle.component.css'],
  providers: [
    {
        provide: DateAdapter, useClass: AppDateAdapter
    },
    {
        provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
    ]
})
export class NuevaordenrecibodetalleComponent implements OnInit {
  model: any = {}  ;
  animal: string;
  date: Date = new Date();
	settings = {
		bigBanner: true,
		timePicker: false,
		format: 'dd-MM-yyyy',
		defaultOpen: true
  }
  
  clientes: Dropdownlist[] = [
    // {val: 1, viewValue: 'Habilitado'},
    // {val: 2, viewValue: 'Bloqueado'},
    // {val: 3, viewValue: 'Eliminado'},
  ];


  constructor(public dialog: MatDialog,
    private generalService: GeneralService,
     private alertify: AlertifyService,
     private ordenReciboService: OrdenReciboService,
     private activatedRoute: ActivatedRoute,
     private router: Router  ) { }

  ngOnInit() {
        this.model.linea = 'Autogenerado';
        this.model.OrdenReciboId  = this.activatedRoute.snapshot.params["uid"];
        this.generalService.getAll(3).subscribe(resp=>
          {
            
            resp.forEach(element => {
              this.clientes.push({
                val: element.id ,
                viewValue: element.nombreEstado
              })
            });
          })

        

  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogBuscarProducto, {
      width: '650px',
      height: '400px',
      data: {codigo: this.model.OrdenReciboId, descripcion: ""}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.model.descripcionLarga = result.descripcionLarga;
      this.model.codigo = result.codigo;
      this.model.productoid = result.id;
    });
  }

  registrar(form: NgForm){
     

    if (form.invalid) {
      return; 
    }
    this.ordenReciboService.registrar_detalle(this.model).subscribe(x=> {
      
    },error => {
      this.alertify.error(error);
    },() => {
      this.alertify.success("Se actualizó correctamente.");
      this.router.navigate(['/verordenrecibo',  this.model.OrdenReciboId ]);

    })


    
  
  }



  onBlurMethod(codigo: string){
    alert(codigo);
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

}
