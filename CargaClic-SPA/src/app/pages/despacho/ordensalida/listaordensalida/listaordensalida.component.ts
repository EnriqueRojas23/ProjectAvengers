import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Dropdownlist } from 'src/app/_models/Constantes';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { OrdenRecibo } from 'src/app/_models/Recepcion/ordenrecibo';
import { ReplaySubject, Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/_services/Mantenimiento/cliente.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { takeUntil } from 'rxjs/operators';
import { OrdenSalidaService } from 'src/app/_services/Despacho/ordensalida.service';
import { OrdenSalida } from 'src/app/_models/Despacho/ordenrecibo';
import { EditButtonRendererComponent } from 'src/app/pages/modal/Edit-button-renderer/Edit-button-renderer.component';
import { SelectItem } from 'primeng/components/common/selectitem';
import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';



const LOGO_URL = 'https://raw.githubusercontent.com/t-ho/ngx-ui-loader/master/src/assets/angular.png'; 

@Component({
  selector: 'app-listaordensalida',
  templateUrl: './listaordensalida.component.html',
  styleUrls: ['./listaordensalida.component.css']
})
export class ListaordensalidaComponent implements OnInit {
  
  loaders: any[];
  
  cols: any[];   
  timers: any[];
  tasks: {};

  selectedRow: OrdenSalida[] = [];
  title = 'app';
   gridApi;
   gridColumnApi;
   frameworkComponents;
   
   es: any;


   almacenes: SelectItem[] = [];

  public loading = false;
  ordenes: OrdenSalida[] = [];
  model: any  = {};
  
  clientes: SelectItem[] = [];
  EstadoId : number;
  context;
  taskId: string = 'bg-default'
  dateInicio: Date = new Date(Date.now()) ;
  dateFin: Date = new Date(Date.now()) ;

  intervalo: SelectItem[] = [
    {value: 0, label: 'Desde Siempre'},
    {value: 1, label: 'Hoy'},
    {value: 3, label: 'Hace tres días'},
    {value: 7, label: 'Hace una semana '},
    {value: 31, label: 'Hace un mes '},
  ];
  estados: SelectItem[] = [
      {value: 21, label: 'Creado'},
      {value: 22, label: 'Planificado'},
      {value: 23, label: 'Asignado'},
      {value: 24, label: 'Despachado'},
    
  ];
  public filteredClientes: ReplaySubject<Dropdownlist[]> = new ReplaySubject<Dropdownlist[]>(1);
  public ClientesCtrl: FormControl = new FormControl();
  public ClientesFilterCtrl: FormControl = new FormControl();
  protected _onDestroy = new Subject<void>();

  constructor(private ordensalidaService: OrdenSalidaService,
    private router: Router,
    private clienteService: ClienteService,
    private generealService : GeneralService,
    private alertify: AlertifyService,
    
    ) 
    { 

      
      this.timers = [];
      this.tasks = {};
  

      

      this.context = { componentParent: this };
      this.frameworkComponents = {
        childMessageRenderer: EditButtonRendererComponent
      };
  }
  ngOnInit() {

 
    
    this.cols = 
    [
        {header: 'ACCIONES', field: 'numOrden' , width: '100px' },
        {header: 'ORDEN', field: 'numOrden'  ,  width: '80px' },
        {header: 'PROPIETARIO', field: 'propietario'  , width: '140px'   },
        {header: 'ESTADO', field: 'nombreEstado'  ,  width: '100px'  },
        {header: 'GR', field: 'guiaRemision' , width: '100px'  },
        {header: 'EQ TRANSP', field: 'equipotransporte'  , width: '140px'  },
        {header: 'F. REQUERIDA', field: 'fechaEsperada'  , width: '130px'  },
        {header: 'F. REGISTRO', field: 'fechaRegistro',width: '120px'    }, 
      ];
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
    

    this.dateInicio.setDate((new Date()).getDate() - 5);
    this.dateFin.setDate((new Date()).getDate() );

    this.model.fec_ini =  this.dateInicio;

    this.model.fec_fin =  this.dateFin ;


  

    this.clienteService.getAllPropietarios("").subscribe(resp => { 
      resp.forEach(element => {
        this.clientes.push({ value: element.id , label: element.razonSocial.toUpperCase()});
      });
      this.generealService.getAllAlmacenes().subscribe(resp=> {
        resp.forEach(element => {
          this.almacenes.push({ value: element.id ,  label : element.descripcion});
        });
        if(localStorage.getItem('PropietarioId') == "undefined" || localStorage.getItem('PropietarioId') == null ) {
          this.model.PropietarioId = 1;
        }
        else {
          this.model.PropietarioId =  parseInt(localStorage.getItem('PropietarioId'));
        }
      
        if(localStorage.getItem('Estado') == null || localStorage.getItem('Estado') == 'undefined') {
           this.model.EstadoId = 131;
        }
        else {
            this.model.EstadoId = parseInt(localStorage.getItem('Estado'));
        }
        if(localStorage.getItem('AlmacenId') == null || localStorage.getItem('AlmacenId') == 'undefined') {
          this.model.AlmacenId = 1;
        }
        else {
            this.model.AlmacenId = parseInt(localStorage.getItem('AlmacenId'));
        }

  
      });
 
    });
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.sizeColumnsToFit();
  }
  selection = new SelectionModel<OrdenRecibo>(true, []);
  checkSelects() {
    return  this.selection.selected.length > 0 ?  false : true;
  }
  checkboxLabel(row?: OrdenRecibo): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.ordenReciboId + 1}`;
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows =  this.ordenes.length;
    return numSelected === numRows;
  }

  ver(id){
    this.router.navigate(['/picking/verordensalida',id]);
   }
   buscar(){
    
    
    this.model.fec_ini =  this.dateInicio;
    this.model.fec_fin =  this.dateFin ;

    localStorage.setItem('AlmacenId', this.model.AlmacenId);
    localStorage.setItem('PropietarioId', this.model.PropietarioId);
    localStorage.setItem('Intervalo', this.model.intervalo);
    localStorage.setItem('Estado', this.model.EstadoId);

    this.ordensalidaService.getAllOrdenSalida(this.model).subscribe(list => {
      this.ordenes = list;
      this.loading = false;
      });
   }
   methodFromParent(cell) {
    alert("Parent Component Method from " + cell + "!");
  }
  edit(id){
      console.log('Editando..');
  }
  delete(id){
     
    this.ordensalidaService.deleteOrder(id).subscribe(resp => {
       this.ordensalidaService.getAllOrdenSalida(this.model).subscribe(list => {
         this.ordenes = list;
         this.loading = false;
   });
    }, error => {
      
     if(error = "err020")
     this.alertify.error("Esta Orden de Recibo tiene productos asociados.");
     else
     this.alertify.error("Ocurrió un error inesperado.");

     }, () => { 


      });
   }


}
