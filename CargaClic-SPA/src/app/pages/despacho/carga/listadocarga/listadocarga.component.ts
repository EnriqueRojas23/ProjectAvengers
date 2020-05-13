import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { Dropdownlist } from 'src/app/_models/Constantes';
import { ReplaySubject, Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { OrdenSalidaService } from 'src/app/_services/Despacho/ordensalida.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { Carga } from 'src/app/_models/Despacho/carga';
import { ClienteService } from 'src/app/_services/Mantenimiento/cliente.service';
import { takeUntil } from 'rxjs/operators';
import { SelectItem } from 'primeng/components/common/selectitem';

@Component({
  selector: 'app-listadocarga',
  templateUrl: './listadocarga.component.html',
  styleUrls: ['./listadocarga.component.css']
})
export class ListadocargaComponent implements OnInit {




  public loading = false;
  lines: Carga[] = [];

  ordenesaux: Carga[] = [];
  model: any  = {};

  selectedRow: Carga[] = [];
  clientes: SelectItem[] = [];
  EstadoId : number;

  intervalo: Dropdownlist[] = [
    {val: 0, viewValue: 'Desde Siempre'},
    {val: 1, viewValue: 'Hoy'},
    {val: 3, viewValue: 'Hace tres días'},
    {val: 7, viewValue: 'Hace una semana '},
    {val: 31, viewValue: 'Hace un mes '},
  ];
  estados: Dropdownlist[] = [
      {val: 25, viewValue: 'Pendiente'},
      {val: 26, viewValue: 'Confirmado'},
      {val: 27, viewValue: 'Despachado'},
  ];

  cols: any[];   

  constructor(private ordensalidaService: OrdenSalidaService
    ,  private alertify: AlertifyService ,
    private clienteService: ClienteService,
    private router: Router) { }

  ngOnInit() {
    

    this.cols = 
    [
        // {header: 'ACCIONES', field: 'workNum' , width: '100px' },
        {header: 'N° Trabajo', field: 'workNum'  ,  width: '180px' },
        {header: 'PROPIETARIO', field: 'propietario'  , width: '280px'   },
        // {header: 'Fecha Asignacion', field: 'fechaAsignacion'  ,  width: '100px'  },
        // {header: 'Fecha Término', field: 'fechaTermino' , width: '100px'  },
        {header: ' Placa', field: 'placa'  , width: '140px'  },
        {header: 'Equipo Transporte', field: 'equipoTransporte'  , width: '130px'  },
        {header: 'Estado', field: 'estado',width: '120px'    }, 
        {header: 'Destino', field: 'destino',width: '120px'    }, 
        // {header: 'Direccion', field: 'direccion',width: '420px'    }, 
        
        
  
      ];


    this.clienteService.getAllPropietarios("").subscribe(resp => { 
      this.clientes.push({ value: 0 , label: "Todos los propietarios"});
      resp.forEach(element => {
        this.clientes.push({ value: element.id , label: element.razonSocial});
      });

      

          this.model.EstadoId = 25;
          this.model.PropietarioId = 0;
          this.ordensalidaService.getAllCargas_pendientes(this.model).subscribe(list => {
            
          this.lines = list;
          console.log(this.lines);
            
            
              
      
            });
    });
  }

  
  checkSelects() {
    return  this.selectedRow.length > 0 ?  false : true;
  }
  // checkboxLabel(row?: Carga): string {
  //   if (!row) {
  //     return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
  //   }
  //   return `${this.selectedRow.isSelected(row) ? 'deselect' : 'select'} row ${row.id+ 1}`;
  // }
  // isAllSelected() {
  //   const numSelected = this.selection.selected.length;
  //   const numRows =  this.lines.length;
  //   return numSelected === numRows;
  // }

  // asignarVehiculo(){
         
  //       this.model.UsuarioRegistroId = 1;
  //       this.ordensalidaService.registrar_carga(this.model).subscribe(resp => {
  //         this.buscar();
  //         this.alertify.success("Se ha asignado el equipo de transporte.");
  //      });

  // }
  asignar() {
    let ids = "";
    this.selectedRow.forEach(el => {
          ids = ids + ',' + el.id;
    });
    this.model.ids = ids.substring(1,ids.length + 1);

    console.log(this.selectedRow);

    this.router.navigate(['/despacho/equipotransportesalida', this.model.ids]);
    
 }
 darsalida() {
  let ids = "";
  this.selectedRow.forEach(el => {
        ids = ids + ',' + el.id;
      
    });
   this.model.ids = ids.substring(1,ids.length + 1);
   
   
     this.ordensalidaService.registrar_salidacarga(this.model).subscribe(x=> 
      {
           this.buscar();
           this.alertify.success("Se ha registrado la salida con éxito");
    });
    


 }


  buscar(){

    
    
    this.model.EstadoId = 25;
    
    this.ordensalidaService.getAllCargas_pendientes(this.model).subscribe(list => {
      
    this.lines = list;
      
      
        

      });
  }


}
