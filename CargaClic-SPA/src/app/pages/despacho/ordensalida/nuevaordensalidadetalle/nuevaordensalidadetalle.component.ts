import { Component, OnInit } from '@angular/core';
import { Dropdownlist } from 'src/app/_models/Constantes';
import { MatDialog } from '@angular/material';
import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { OrdenReciboService } from 'src/app/_services/Recepcion/ordenrecibo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DialogBuscarProducto } from 'src/app/pages/modal/ModalBuscarProducto/ModalBuscarProducto.component';
import { OrdenSalidaService } from 'src/app/_services/Despacho/ordensalida.service';
import { ProductoService } from 'src/app/_services/Mantenimiento/producto.service';

@Component({
  selector: 'app-nuevaordensalidadetalle',
  templateUrl: './nuevaordensalidadetalle.component.html',
  styleUrls: ['./nuevaordensalidadetalle.component.css']
})
export class NuevaordensalidadetalleComponent implements OnInit {

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
  ];
  huellas: Dropdownlist[] = [
  ];
  huellaDetalle: Dropdownlist[] = [
  ];

  constructor(public dialog: MatDialog,
    private generalService: GeneralService,
     private alertify: AlertifyService,
     private ordenSalidaService: OrdenSalidaService,
     private activatedRoute: ActivatedRoute,
     private productoService: ProductoService,
     private router: Router  ) { }

  ngOnInit() {

      
     




      this.model.linea = 'Autogenerado';
      this.model.OrdenSalidaId  = this.activatedRoute.snapshot.params["uid"];
      
      this.generalService.getAll(3).subscribe(resp=>
        {
          
          resp.forEach(element => {
            this.clientes.push({
              val: element.id ,
              viewValue: element.nombreEstado
            })
          });
          this.clientes.push({
            val: 10,
            viewValue : "Disponible y Merma"
          })
        })
  }
  openDialog(): void {
    
    this.ordenSalidaService.obtenerOrden(this.model.OrdenSalidaId).subscribe( resp => 
      {

        
        
        const dialogRef = this.dialog.open(DialogBuscarProducto, {
              width: '650px',
              height: '500px',
              data: {codigo: resp.propietarioId, descripcion: ""}
            });
            dialogRef.afterClosed().subscribe(result => {
              this.model.descripcionLarga = result.descripcionLarga;
              this.model.codigo = result.codigo;
              this.model.productoid = result.id;


              this.huellas = [];
              this.productoService.getHuellas(this.model.productoid).subscribe(resp=>
              {
        
                resp.forEach(element => {
                  this.huellas.push({
                    val: element.id ,
                    viewValue: element.codigoHuella + ' -Cama de  ' + element.caslvl 
                  })
                });
              });
        



            });
      })


   
  }

  registrar(form: NgForm){
    if (form.invalid) {
      return; 
    }
    this.ordenSalidaService.registrar_detalle(this.model).subscribe(x=> {
      
    },error => {
      this.alertify.error(error);
    },() => {
      this.alertify.success("Se actualizó correctamente.");
      this.router.navigate(['/picking/verordensalida',  this.model.OrdenSalidaId ]);
    })
  }



  onBlurMethod(codigo: string){
    
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  cancel(){
    this.router.navigate(['/picking/verordensalida',  this.model.OrdenSalidaId ]);
  }
  CambioHuella(id){
    this.huellaDetalle = [];
        this.productoService.getHuellasDetalle(id).subscribe(resp=>
        {
          
          resp.forEach(element => {
            this.huellaDetalle.push({
              val: element.unidadMedidaId ,
              viewValue: element.unidadMedida + ' - ' + element.untQty + ' Unidades'
            })
          });
        });
  
  }
}
