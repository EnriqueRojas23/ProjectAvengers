import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Cliente } from 'src/app/_models/Mantenimiento/cliente';
import { ClienteService } from 'src/app/_services/Mantenimiento/cliente.service';
import { Router } from '@angular/router';
import { Dropdownlist } from 'src/app/_models/Constantes';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';
import { NgForm } from '@angular/forms';




export interface DialogData {
  nombre: string ;
  tipoDocumentoId: number;
  codigo: number;
  documento: number;

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'modal.agregarcliente.html',
  
})
export class DialogNuevoCliente {
  clientes: Dropdownlist[] = [];
  model: any = {};

  constructor(
    public dialogRef: MatDialogRef<DialogNuevoCliente>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private clienteService : ClienteService,
    private alertify: AlertifyService ) {
    this.model.PropietarioId = data.codigo;

      this.clienteService.getAllClientes("").subscribe(resp => {
          resp.forEach(element => {
            this.clientes.push({ val: element.id , viewValue: element.razonSocial});
          });
        });

    }
  onNoClick(): void {
    this.dialogRef.close();
  }
  close() : void {
    this.dialogRef.close();
  }
  registrar(form: NgForm){
    if (form.invalid) {
      return; 
    } 
      console.log(this.model);
      this.clienteService.vincularPropitearioCliente(this.model).subscribe(x=> {
    },error => {
      this.alertify.error(error);
    },() => {
      this.alertify.success("Se actualizó correctamente.");
      this.dialogRef.close();
    })
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
  selector: 'app-listadopropietario',
  templateUrl: './listadopropietario.component.html',
  styleUrls: ['./listadopropietario.component.css']
})
export class ListadopropietarioComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  pageSizeOptions:number[] = [5, 10, 25, 50, 100];
  displayedColumns: string[] = [ 'razonSocial','nombreCorto' , 'tipoDocumento', 'documento' ,'actionsColumn' ];

  listData: MatTableDataSource<Cliente>;
  public loading = false;
  clientes: Cliente[];
  model: any  = {};


  @ViewChild(MatSort) sort1: MatSort;
  @ViewChild(MatPaginator) paginator1: MatPaginator;
  searchKey1: string;
  
  displayedColumns1: string[] = [ 'razonSocial', 'tipoDocumento', 'documento' ,'actionsColumn' ];
  clientes2: Cliente[];
  listData1: MatTableDataSource<Cliente>;


  constructor(private clienteService: ClienteService
    ,public dialog: MatDialog
    ,private router: Router) { }

  ngOnInit() {
    this.model.criterio = "";
    this.clienteService.getAllPropietarios(this.model.criterio).subscribe(resp => {
      
    this.clientes = resp;

    this.listData = new MatTableDataSource(this.clientes);
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
  verClientes(id){
    this.loading  = true;
    
    this.clienteService.getAllClientesxPropietarios(id).subscribe(resp => {
    this.clientes2 = resp;
    this.loading  = false;
    this.listData1 = new MatTableDataSource(this.clientes2);
    this.listData1.paginator = this.paginator;
    this.listData1.sort = this.sort;

    this.listData1.filterPredicate = (data,filter) => {
      return this.displayedColumns.some(ele => {
        
        if(ele != 'almacen' && ele !='cliente' && ele != 'familia' )
           {
            
              return ele != 'actionsColumn' && data[ele].toLowerCase().indexOf(filter) != -1;
           }
        })
       }
    });
  }
  Vincular(id) : void {
    const dialogRef = this.dialog.open(DialogNuevoCliente, {
      width: '550px',
      height: '300px',
      data: { codigo: id }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.model.descripcionLarga = result.descripcionLarga;
      this.model.codigo = result.codigo;
      this.model.productoid = result.id;
    });
  
  }
}
