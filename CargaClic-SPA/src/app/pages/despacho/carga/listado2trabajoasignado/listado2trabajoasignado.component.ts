import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { Carga } from 'src/app/_models/Despacho/carga';
import { OrdenSalida } from 'src/app/_models/Despacho/ordenrecibo';
import { Dropdownlist } from 'src/app/_models/Constantes';
import { ReplaySubject, Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { OrdenSalidaService } from 'src/app/_services/Despacho/ordensalida.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/_services/Mantenimiento/cliente.service';
import { takeUntil } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { DialogAsignarPuerta } from 'src/app/pages/modal/ModalAsignarPuerta/ModalAsignarPuerta.component';
import { DialogAsignarTrabajador } from 'src/app/pages/modal/ModalAsignarTrabajador/ModalAsignarTrabajador.component';
import { AuthService } from 'src/app/_services/auth.service';
import { SelectItem } from 'primeng/components/common/selectitem';

@Component({
  selector: 'app-Listado2trabajoasignado',
  templateUrl: './Listado2trabajoasignado.component.html',
  styleUrls: ['./Listado2trabajoasignado.component.css']
})
export class Listado2trabajoasignadoComponent implements OnInit {


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  pageSizeOptions:number[] = [5, 10, 25, 50, 100];
  displayedColumns: string[] = [  'workNum' ,'propietario','FechaRegistro','FechaAsignacion','FechaTermino', 'Estado', 'Ubicacion','Direccion' ,'actionsColumn'  ];
  el: any[] = [];
  listData: MatTableDataSource<Carga>;
  public loading = false;
  cargas: Carga[] = [];

  ordenesaux: OrdenSalida[] = [];
  model: any  = {};

  selectedRow: Carga[] = [];
  cols: any[];   
  clientes: SelectItem[] = [];
  EstadoId : number;


  estados: Dropdownlist[] = [
      {val: 21, viewValue: 'Planeado'},
      {val: 5, viewValue: 'Asignado'},
      {val: 6, viewValue: 'Recibiendo'},
    {val: 12, viewValue: 'Almacenado'},
    
  ];



  constructor(private ordensalidaService: OrdenSalidaService,
    private alertify: AlertifyService ,
    private router: Router,
    public dialog: MatDialog,
    private clienteService: ClienteService,
    public authService: AuthService) { }

    ngOnInit() {

      this.cols = 
      [
          {header: 'ACCIONES', field: 'workNum' , width: '110px' },
          {header: 'N° Trabajo', field: 'workNum'  ,  width: '110px' },
          {header: 'Propietario', field: 'propietario'  , width: '160px'   },
          {header: 'F.Asignación', field: 'fechaAsignacion'  ,  width: '100px'  },
          {header: 'F.Término', field: 'fechaTermino' , width: '100px'  },
          {header: '# Pallets', field: 'cantidadLPN'  , width: '100px'  },
          {header: '# Bultos', field: 'cantidadTotal'  , width: '100px'  },
          {header: 'Estado', field: 'estado',width: '120px'    }, 
          
          
          
          
    
        ];
 
      this.clienteService.getAllPropietarios("").subscribe(resp => { 
        resp.forEach(element => {
          this.clientes.push({ value: element.id , label: element.razonSocial});
        });
      

      const token = this.authService.jwtHelper.decodeToken(localStorage.getItem('token'));
      console.log(token.nameid);
  
  
      this.loading = true;
      this.model.intervalo = 3;
      this.model.estadoIdfiltro = 30;
      
      
      
      this.EstadoId =this.model.estadoIdfiltro;
      this.model.PropietarioId = 0;
  
      
      //this.model.PropietarioId = 1;
      this.model.EstadoId = 31;
      
  
  
  
      this.ordensalidaService.getAllWork_Asignado(this.model).subscribe(list => {
        
        this.cargas = list;
        console.log(this.cargas);
        this.loading = false;
        this.listData = new MatTableDataSource(this.cargas);
        this.listData.paginator = this.paginator;
        this.listData.sort = this.sort;
        
          
 
        });

    });
  }
    checkSelects() {
      return  this.selectedRow.length > 0 ?  false : true;
    }
    asignar() {
       if(this.selectedRow.length > 1)
       {
          this.alertify.warning("Debe seleccionar solo un elemento");
          return;
       } 
      let idcarga = this.selectedRow[0].id ;
      //  this.alertify.success("Se registró correctamente.");
       this.router.navigate(['/despacho/equipotransportesalida', idcarga]);
       
       }
  
    asignarPuerta(): void {
  
      if(this.selectedRow.length > 1 || this.selectedRow.length ==  0){
        this.alertify.error("Debe seleccionar solo una liquidación");
        return ;
      }
      
  
      const dialogRef = this.dialog.open(DialogAsignarPuerta, {
        width: '700px',
        height: '350px',
        data: {codigo: this.selectedRow, descripcion: ""}
      });
      dialogRef.afterClosed().subscribe(result => {
        this.model.descripcionLarga = result.descripcionLarga;
        this.model.codigo = result.codigo;
        this.model.productoid = result.id;
      });
    }
    asignarTrabajador(): void {
  
      if(this.selectedRow.length > 1 || this.selectedRow.length ==  0){
        this.alertify.error("Debe seleccionar solo una liquidación");
        return ;
      }
      
  
      const dialogRef = this.dialog.open(DialogAsignarTrabajador, {
        width: '700px',
        height: '350px',
        data: {codigo: this.selectedRow, descripcion: ""}
      });
      dialogRef.afterClosed().subscribe(result => {
        this.model.descripcionLarga = result.descripcionLarga;
        this.model.codigo = result.codigo;
        this.model.productoid = result.id;
      });
    }
    ver(id){
      this.router.navigate(['/picking/confirmarmovimiento', id]);
    }
    applyFilter() {
      this.listData.filter = this.searchKey.trim().toLowerCase();
    }
    buscar(){
      this.loading = true;
      this.ordensalidaService.getAllWork_Asignado(this.model).subscribe(list => {
        
        this.cargas = list;
        this.loading = false;

        console.log(this.model);
 
        });
    }
    
  }
  
