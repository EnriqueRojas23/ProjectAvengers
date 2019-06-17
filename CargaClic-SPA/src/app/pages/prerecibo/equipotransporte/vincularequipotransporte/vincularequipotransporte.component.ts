import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Vehiculo } from 'src/app/_models/Mantenimiento/vehiculo';
import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';
import { Proveedor } from 'src/app/_models/Mantenimiento/proveedor';
import { Chofer } from 'src/app/_models/Mantenimiento/chofer';
import { NgForm } from '@angular/forms';
import { OrdenReciboService } from 'src/app/_services/Recepcion/ordenrecibo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Data } from 'src/app/_providers/data';
import { Dropdownlist } from 'src/app/_models/Constantes';


//Buscar Vehiculo Modal 
/////////////

export interface DialogData {
  codigo: any;
  descripcion: string;
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'modal.buscarplaca.html',
  styleUrls: ['./vincularequipotransporte.component.css'],
})

export class DialogBuscarPlaca {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageSizeOptions:number[] = [5, 10, 25, 50, 100];
  displayedColumns: string[] = [ 'Placa', 'TipoVehiculo','Modelo', 'Marca', 'actionsColumn' ];

  vehiculos: Vehiculo[];

  listData: MatTableDataSource<Vehiculo>;
  model: any = {};

  constructor(
    public dialogRef: MatDialogRef<DialogBuscarPlaca>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private equipotransporteService: GeneralService) {
      this.model.codigo = data.codigo;
      this.buscar();

    }
    onNoClick(): void {
    this.dialogRef.close();
    
  }
  seleccionarPlaca(row: any){
     this.dialogRef.close( this.model.placa = this.vehiculos.filter(x => x.id == row)[0]);
  }

  buscar(){
    this.equipotransporteService.getVehiculos(this.model.codigo).subscribe(x=> {
        this.vehiculos = x;
        this.listData = new MatTableDataSource(this.vehiculos);
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
///////Busqueda empresa de transporte modal 

@Component({
  selector: 'dialog-emptransporte',
  templateUrl: 'modal.buscaremptransporte.html',
  styleUrls: ['./vincularequipotransporte.component.css'],
})

export class DialogBuscarEmpTransporte {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageSizeOptions:number[] = [5, 10, 25, 50, 100];
  displayedColumns: string[] = [ 'ruc', 'razonSocial', 'actionsColumn' ];
  
  proveedores: Proveedor[];

  listData: MatTableDataSource<Proveedor>;
  model: any = {};

  constructor(
    public dialogRef: MatDialogRef<DialogBuscarEmpTransporte>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private equipotransporteService: GeneralService) {
      

    }
    onNoClick(): void {
    this.dialogRef.close();
    
  }
  seleccionarEmpTransporte(row: any){
     this.dialogRef.close( this.model.ruc = this.proveedores.filter(x => x.id == row)[0]);
  }

  buscar(){
    
    this.equipotransporteService.getProveedores(this.model.codigo).subscribe(x=> {
      
     
        this.proveedores = x;
        
        this.listData = new MatTableDataSource(this.proveedores);
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


///////Busqueda chofer modal 

@Component({
  selector: 'dialog-buscachofer',
  templateUrl: 'modal.buscarchofer.html',
  styleUrls: ['./vincularequipotransporte.component.css'],
})

export class DialogBuscarChofer {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageSizeOptions:number[] = [5, 10, 25, 50, 100];
  displayedColumns: string[] = [ 'nombreCompleto', 'dni','brevete', 'telefono', 'actionsColumn' ];

  choferes: Chofer[];

  listData: MatTableDataSource<Chofer>;
  model: any = {};

  constructor(
    public dialogRef: MatDialogRef<DialogBuscarChofer>,
    @Inject(MAT_DIALOG_DATA) public dialogdata: DialogData,
    private equipotransporteService: GeneralService
    ) {

      this.model.codigo = dialogdata.codigo;
      
      this.buscar();
      

    }
    onNoClick(): void {
    this.dialogRef.close();
    
  }
  seleccionarChofer(row: any){
     
     this.dialogRef.close( this.model = this.choferes.filter(x => x.id == row)[0]);
  }

  buscar(){
    this.equipotransporteService.getChoferes(this.model.codigo).subscribe(x=> {
        this.choferes = x;
        //this.loading = false;
        this.listData = new MatTableDataSource(this.choferes);
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


declare let alertify: any;
@Component({
  selector: 'app-vincularequipotransporte',
  templateUrl: './vincularequipotransporte.component.html',
  styleUrls: ['./vincularequipotransporte.component.css']
})
export class VincularequipotransporteComponent implements OnInit {
 model: any = {};
 transporte: any = {};
 id: any;

 tipoVehiculo: Dropdownlist[] = [
];

marcaVehiculo: Dropdownlist[] = [
];

  constructor(public dialog: MatDialog,
   private equipoTransporteService: OrdenReciboService,
   private router: Router,
   private alertify: AlertifyService ,
   private general: GeneralService,
   private equipotransporteService: GeneralService,
   private data: Data ) { }

  ngOnInit() {
    
    this.model.PropietarioId =  (this.data.storage[0].propietarioID);

    this.general.getValorTabla(4).subscribe(resp=> 
      {
        resp.forEach(element => {
          this.tipoVehiculo.push({ val: element.id , viewValue: element.valorPrincipal});
        });
         
      })
      this.general.getValorTabla(5).subscribe(resp=> 
        {
          resp.forEach(element => {
            this.marcaVehiculo.push({ val: element.id , viewValue: element.valorPrincipal});
          });
           
        })

    
  }
  openDialog(placa): void {
    const dialogRef = this.dialog.open(DialogBuscarPlaca, {
      width: '650px',
      height: '500px',
      data: {codigo:placa, descripcion: ""}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.model.placa = result.placa;
      this.model.tipoVehiculo = result.tipoVehiculo;
      this.model.marca = result.marca;
      this.model.modelo = result.modelo;
      this.model.cargaUtil = result.cargaUtil;
      this.model.pesoBruto = result.pesoBruto;
    });
  }
  openDialog_EmpTrans(): void {
    const dialogRef = this.dialog.open(DialogBuscarEmpTransporte, {
      width: '650px',
      height: '500px',
      data: {codigo: "this.model.OrdenReciboId", descripcion: ""}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.model.razonSocial = result.ruc + ' - ' + result.razonSocial  ;
      this.model.ruc = result.ruc ;
    });
  }
  openDialog_Dni(dni): void {
    const dialogRef = this.dialog.open(DialogBuscarChofer, {
      width: '650px',
      height: '500px',
      data: {codigo: dni, descripcion: ""}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.model.dni = result.dni;
      this.model.nombreCompleto = result.nombreCompleto;
      this.model.brevete = result.brevete;
    });
  }
  registrar(form: NgForm) {
    
    if (form.invalid) {
      return; 
    }

    this.equipoTransporteService.vincularEquipoTransporte(this.model).subscribe(resp => { 

      this.transporte = resp;
     



    }, error => {
       this.alertify.error(error);
    }, () => { 

      this.data.storage.forEach(element => {
        
  
        
        this.model.OrdenReciboId =element.ordenReciboId;
        this.model.Id = this.transporte.id;

        this.equipoTransporteService.matchEquipoTransporte(this.model).subscribe(resp1 => { 
          
   
       }, error => {
          this.alertify.error(error);
       }, () => { 
         this.alertify.success("Se vinculó al equipo correctamente.");
         
       });
  
     
      });
      new Promise( resolve => setTimeout(resolve, 300) );

      this.alertify.success("Se creo el equipo de transporte correctamente.");
      this.router.navigate(['/recibo/listaordenrecibo']);
    });




  }
  onBlurMethod(placa){

     // Buscar en 
     this.equipoTransporteService.getEquipoTransporte(placa).subscribe(x=>
      {
        
           
            if(x != null)
            {
               this.model.tipoVehiculo  = x.tipoVehiculoId;
               this.model.marcaVehiculo = x.marcaId;
               this.model.razonSocial = x.razonSocial;
               this.model.ruc = x.ruc;
               this.model.id = x.id;
               this.model.dni = x.dni;
               this.model.nombreCompleto = x.nombreCompleto;
               this.model.brevete = x.brevete;

               
               
            } 
            else
            {
                
            }

      });



      
  }
  PlacaEncontrada(){
    
     if(this.model.id == undefined) return true; else return false;
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

}
