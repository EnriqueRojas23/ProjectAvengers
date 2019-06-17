import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Cliente } from 'src/app/_models/Mantenimiento/cliente';
import { ClienteService } from 'src/app/_services/Mantenimiento/cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForOf } from '@angular/common';
import { NgForm } from '@angular/forms';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Dropdownlist } from 'src/app/_models/Constantes';
import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';



// export interface DialogData {
//   nombre: string ;
//   tipoDocumentoId: number;
//   documento: number;

// }

// @Component({
//   selector: 'dialog-overview-example-dialog',
//   templateUrl: 'modal.agregarcliente.html',
  
// })
// export class DialogNuevoCliente {
//   tipodocumento: Dropdownlist[] = [];
//   model: any = {};

//   constructor(
//     public dialogRef: MatDialogRef<DialogNuevoCliente>,
//     @Inject(MAT_DIALOG_DATA) public data: DialogData,
//     private clienteService : ClienteService,
//     private alertify: AlertifyService ,
//     private generalService: GeneralService, 
//     private router: Router ) {

//       this.generalService.getValorTabla(15).subscribe(resp=> 
//         {
//           resp.forEach(element => {
//             this.tipodocumento.push({ val: element.id , viewValue: element.valorPrincipal});
//           });
//         });

//     }
//     onNoClick(): void {
//     this.dialogRef.close();
//   }
//   registrar(form: NgForm){
//     if (form.invalid) {
//       return; 
//     } 
//       console.log(this.model);
//       this.clienteService.registrarCliente(this.model).subscribe(x=> {
      
//     },error => {
//       this.alertify.error(error);
//     },() => {
//       this.alertify.success("Se actualizó correctamente.");
      
//     })
//   }
//   numberOnly(event): boolean {
//     const charCode = (event.which) ? event.which : event.keyCode;
//     if (charCode > 31 && (charCode < 48 || charCode > 57)) {
//       return false;
//     }
//     return true;
//   }


// }







@Component({
  selector: 'app-verdetallecliente',
  templateUrl: './verdetallecliente.component.html',
  styleUrls: ['./verdetallecliente.component.css']
})
export class VerdetalleclienteComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  pageSizeOptions:number[] = [5, 10, 25, 50, 100];
  displayedColumns: string[] = [ 'razonSocial', 'documento'  ,'actionsColumn' ];

  listData: MatTableDataSource<Cliente>;
  public loading = false;
  productos: Cliente[];
  model: any  = {};
  id: number;
  
  constructor(private clienteService: ClienteService
    ,private router: Router
    ,public dialog: MatDialog
    , public activeRoute: ActivatedRoute) { }

  ngOnInit() {

    this.model.criterio = "";
    this.id =   this.activeRoute.snapshot.params["uid"];

    this.clienteService.get(this.id).subscribe(resp => {
      this.model  = resp;
      
    })

    this.clienteService.getAllClientes('').subscribe(resp => {


    this.productos = resp;

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
  // openDialogNuevo(): void {
  //   const dialogRef = this.dialog.open(DialogNuevoCliente, {
  //     width: '650px',
  //     height: '400px',
  //     data: { codigo: this.id }
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     this.model.descripcionLarga = result.descripcionLarga;
  //     this.model.codigo = result.codigo;
  //     this.model.productoid = result.id;
  //   });
  // }

}
