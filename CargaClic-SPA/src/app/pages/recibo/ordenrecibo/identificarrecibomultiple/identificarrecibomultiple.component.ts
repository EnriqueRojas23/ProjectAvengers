import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdenReciboService } from 'src/app/_services/Recepcion/ordenrecibo.service';
import {  OrdenReciboDetalle } from 'src/app/_models/Recepcion/ordenrecibo';
import { ProductoService } from 'src/app/_services/Mantenimiento/producto.service';
import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';
import { SelectItem } from 'primeng/components/common/selectitem';
import { NgForm } from '@angular/forms';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { InventarioGeneral } from 'src/app/_models/Inventario/inventariogeneral';
declare var $: any;

@Component({
  selector: 'app-identificarrecibomultiple',
  templateUrl: './identificarrecibomultiple.component.html',
  styleUrls: ['./identificarrecibomultiple.component.css']
})
export class IdentificarrecibomultipleComponent implements OnInit {
  id: any;
  es: any;
  public loading = false;
  modeldetail: any = {};
  EquipoTransporteId: any;
  ordenes: OrdenReciboDetalle[] = [] ;
  cols: any[];   
  cols2: any[];  
  selectedRow: OrdenReciboDetalle[] = [];
  total : number = 0;
  AddInventario: InventarioGeneral[] = [] ;
  huellaDetalle: SelectItem[] = [];
  


  



  huellas: SelectItem[] = [
  ];
  estados: SelectItem[] = [
  ];

  constructor(private activatedRoute: ActivatedRoute,
    private ordenServicio : OrdenReciboService,
    private generalService: GeneralService,
    private alertify: AlertifyService,
    private router: Router,
    private productoService: ProductoService) { }

  ngOnInit() {
    this.id  = this.activatedRoute.snapshot.params["uid"]; 
    this.EquipoTransporteId  = this.activatedRoute.snapshot.params["uid2"];
    this.AddInventario    = [] ;


    this.generalService.getAll(3).subscribe(resp=>
      {
        resp.forEach(element => {
          this.estados.push({value: element.id ,label: element.nombreEstado});
        });
      });


    this.es = {
      firstDayOfWeek: 1,
      dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
      dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
      dayNamesMin: [ "D","L","M","X","J","V","S" ],
      monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
      monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ],
      today: 'Hoy',
      clear: 'Borrar'
  }
    this.cols = 
    [
        {header: 'L.', field: 'linea'  ,  width: '50px' },
        {header: 'SKU', field: 'codigo'  , width: '100px'   },
        {header: 'PRODUCTO', field: 'producto'  ,  width: '190px'  },
        {header: 'CANT', field: 'cantidad' , width: '80px'  },
        {header: 'PEND', field: 'faltante'  , width: '80px'  },
        {header: 'ESTADO', field: 'estado',width: '80px'    }, 
    ];

    this.cols2 = 
    [
        {header: 'ACC', field: 'numOrden' , width: '40px' },
        {header: 'SKU', field: 'codigo'  , width: '80px'   },
        {header: 'PRODUCTO', field: 'producto'  ,  width: '150px'  },
        {header: 'CANT', field: 'cantidad' , width: '60px'  },
        {header: 'ESTADO', field: 'completo',width: '80px'    }, 
    ];
      
    this.load();


  }
  load(){
    this.ordenServicio.obtenerOrden(this.id).subscribe(resp => { 
      this.ordenes = resp.detalles;
      
    });
  }

  actualizar(form: NgForm){
    this.total = 0;
    var productos = this.AddInventario.filter(element => element.productoId == this.modeldetail.productoId );

    productos.forEach(x=> {
      this.total =  this.total  +    +x.untQty   ;
     });

        this.AddInventario.push({
           productoId : this.modeldetail.productoId,
           untQty : this.modeldetail.untQty,
           descripcionLarga: this.modeldetail.producto,
           lotNum : this.modeldetail.LotNum,
           huellaId : +this.modeldetail.huellaId,
           codigo: this.modeldetail.codigo,
           linea: this.modeldetail.linea,
           estadoId : this.modeldetail.estadoId,
           estado: this.estados.find(x=>x.value == this.modeldetail.estadoId).label,
           OrdenReciboDetalleId :  this.modeldetail.id,
           ordenReciboId : this.id,
           id: this.AddInventario.length,
           FechaManufactura: this.modeldetail.fechaManufactura,
           fechaExpire: this.modeldetail.fechaExpire,
         });
         this.ordenes.find(x=>x.productoId == this.modeldetail.productoId).cantidadRecibida = this.total +  +this.modeldetail.cantidadRecibida ;

  }


  onChangeHuella(huella){
    this.huellaDetalle = [];

    this.productoService.getHuellasDetalle(huella.value).subscribe(resp=>
    {
      
      resp.forEach(element => {
        this.huellaDetalle.push({value: element.unidadMedidaId ,label: element.unidadMedida + ' - ' + element.untQty + ' Unidades'
        })
      });
    });
  }
  
  generarPallet() {  
          this.loading = true;
          this.ordenServicio.identificar_detallemultiple(this.AddInventario).subscribe(resp => { 
            this.alertify.success("Se generó correctamente.");
            
          }, error => {
            this.alertify.error("Ocurrió un error en el proceso de registro. Revise la cantidad recibida."); 
            this.loading = false;
          } , () => {
            this.loading = false;
            this.AddInventario = [];
            this.load();
            
          });
  }
  terminar() {
    this.loading = true;
    this.ordenServicio.cerrar_identificacion(this.id).subscribe(resp => { 

    }, error => {
      if(error == 'err011')
        this.alertify.error("Tiene líneas pendientes por identificar"); 
      else
        this.alertify.error(error);
    }, () => { 
      this.loading = false;
      this.alertify.success("Se actualizó correctamente.");
      this.router.navigate(['/recibo/listaordenrecibida',  this.EquipoTransporteId ]);
    });
}
  delete(id) {
    var productos = this.AddInventario.filter(element => element.id == id)[0];
    const index =  this.AddInventario.indexOf(productos ,0 );
    this.AddInventario.splice(index, 1);
  }

identificar(event){
  this.loading = true;
    $("html,body").animate({ scrollTop: 1200 }, "slow");
   this.ordenServicio.obtenerOrdenDetalle(event.data.id).subscribe(resp => {
     this.modeldetail =  resp;
     this.huellas = [];
     this.productoService.getHuellas(this.modeldetail.productoId).subscribe(resp=>
     {
       resp.forEach(element => {
         this.huellas.push({value: element.id ,label: element.codigoHuella + ' -Cama de  ' + element.caslvl 
         });
       });
     });

     this.loading = false;
   })

 
}
numberOnly(event): boolean {
  const charCode = (event.which) ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;
 }
 generarPallets(){
   
  this.loading = true;
  this.ordenServicio.identificar_detalle(this.modeldetail).subscribe(resp => { 

  }, error => {
    this.loading = false;
     if(error == "err010")
     this.alertify.error("La cantidad que intenta recibir supera el límite de la cantidada esperada");
     else 
     this.alertify.error(error);
  }, () => {
      this.loading = false; 
      this.id  = this.activatedRoute.snapshot.params["uid"];
      this.ordenServicio.obtenerOrden(this.id).subscribe(resp => { 
      this.ordenes = resp.detalles;
      });
    
    this.modeldetail = {};
    this.alertify.success("Se actualizó correctamente.");
    
  });
 }

}
