import { Component, OnInit, ViewChild, Inject, ChangeDetectorRef } from '@angular/core';
import { ProductoService } from 'src/app/_services/Mantenimiento/producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSort, MatPaginator, MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { HuellaDetalle } from 'src/app/_models/Mantenimiento/huella';
import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';
import { Dropdownlist } from 'src/app/_models/Constantes';
import { NgForm } from '@angular/forms';


export interface DialogData {
  id: number;
  codigo: string;
  DescripcionLarga: string;
  caslvl: string;
  unidadMedidaId: number;
  HuellaId: number;
  UntQty: number;
  Netwgt: any;
  Grswgt: any;
  Height: any;
  Length: any;
  Width: any;
}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'modal.nuevo.html',
  
})
export class DialogNuevaHuellaDetalle {
  id: number;
  model : any = {};
  UnidadMedida: Dropdownlist[] = [
  ];

  constructor(
    public dialogRef: MatDialogRef<DialogNuevaHuellaDetalle>,
    private productoService: ProductoService,
    private generalService: GeneralService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.data.HuellaId = data.id;
      // this.productoService.getHuella(data.id).subscribe(resp => {
      //   this.model = resp;

      //   data.codigo = this.model.codigoHuella;
      //   data.caslvl = this.model.caslvl;
      // })
     this.UnidadMedida = [];
      this.generalService.getValorTabla(9).subscribe(resp => {
        resp.forEach(element => {
          this.UnidadMedida.push({
            val: element.id ,
            viewValue: element.valorPrincipal 
          })
        });
      })

    }
  onNoClick(): void {
    this.dialogRef.close();
  }
  registrar(form: NgForm) {
    console.log(this.data);
    if (form.invalid) {
      return; 
    }
    this.productoService.registrarHuellaDetalle(this.data).subscribe(resp => { 
    }, error => {
       
    }, () => { 
      this.dialogRef.close();
    });
    
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
    
  
}



@Component({
  selector: 'app- ',
  templateUrl: './nuevahuelladetalle.component.html',
  styleUrls: ['./nuevahuelladetalle.component.css']
})
export class NuevahuelladetalleComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  pageSizeOptions:number[] = [5, 10, 25, 50, 100];
  displayedColumns: string[] = [ 'unidadmedida', 'alto' ,'largo', 'ancho','pesobruto','pesoneto','cantidad' ,'actionsColumn' ];

  listData: MatTableDataSource<HuellaDetalle>;
  public loading = false;
  productos: HuellaDetalle[];
  model: any  ;

  id: any;
  productoId: any;

  constructor(private productoService: ProductoService
    ,private activatedRoute: ActivatedRoute
    ,private router: Router
    ,public dialog: MatDialog) { }

  ngOnInit() {
    this.loading = true;
    this.id  = this.activatedRoute.snapshot.params["uid"];
    this.productoId  = this.activatedRoute.snapshot.params["uid2"];
    this.productoService.getHuellasDetalle(this.id).subscribe(resp => {


      this.productos = resp ;
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
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogNuevaHuellaDetalle, {
      width: '550px',
      height: '550px',
      data: {id: this.id  }
    });


    dialogRef.afterClosed().subscribe(result => {
      
      this.productoService.getHuellasDetalle(this.id).subscribe(resp => {
        this.productos = resp ;
        this.loading = false;
        this.listData = new MatTableDataSource(this.productos);
        this.listData.paginator = this.paginator;
        this.listData.sort = this.sort;

      });


    });
  };
  delete(id) {
    this.productoService.deleteHuellaDetalle(id).subscribe(x=> {
        this.productoService.getHuellasDetalle(this.id).subscribe(resp => {
              this.productos = resp ;
              this.loading = false;
              this.listData = new MatTableDataSource(this.productos);
              this.listData.paginator = this.paginator;
              this.listData.sort = this.sort;

        });



    }, error => {
         
    }, () => { 
        
    });
}
  regresar(){
    this.router.navigate(['/mantenimiento/verproducto',  this.productoId]); 
  }
}
