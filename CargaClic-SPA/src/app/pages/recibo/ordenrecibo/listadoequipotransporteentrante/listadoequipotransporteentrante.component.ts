import { Component, OnInit } from '@angular/core';
import { EquipoTransporte } from 'src/app/_models/Recepcion/equipotransporte';
import { Dropdownlist } from 'src/app/_models/Constantes';
import { SelectionModel } from '@angular/cdk/collections';
import { OrdenReciboService } from 'src/app/_services/Recepcion/ordenrecibo.service';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/_services/Mantenimiento/cliente.service';
import { SelectItem } from 'primeng/components/common/selectitem';
import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';

@Component({
  selector: 'app-listadoequipotransporteentrante',
  templateUrl: './listadoequipotransporteentrante.component.html',
  styleUrls: ['./listadoequipotransporteentrante.component.css']
})
export class ListadoequipotransporteentranteComponent implements OnInit {
  cols: any[];    
  dateInicio: Date = new Date(Date.now()) ;
  dateFin: Date = new Date(Date.now()) ;
  es: any;
  transportes: EquipoTransporte[] = [];

  public loading = false;
  clientes: SelectItem[] = [];
  model: any = {};
  intervalo: Dropdownlist[] = [
    {val: 0, viewValue: 'Desde Siempre'},
    {val: 1, viewValue: 'Hoy'},
    {val: 3, viewValue: 'Hace tres días'},
    {val: 7, viewValue: 'Hace una semana '},
    {val: 31, viewValue: 'Hace un mes '},
  ];

  estados: SelectItem[] = [
    {value: 131 , label : "Llegada y Asignado" },
    {value: 13, label: 'Llegada'},
    {value: 14, label: 'Asignado'},
    {value: 15, label: 'En Descarga'},
    {value: 16, label: 'Cerrado'},
  ];

  almacenes: SelectItem[] = [];

  constructor(private ordenreciboService: OrdenReciboService,
    private clienteService: ClienteService,
    private generealService : GeneralService,
    private router: Router) { }

  ngOnInit() {

    this.cols = 
    [
        {header: 'ACCIONES', field: 'id' , width: '100px' },
        {header: 'ALMACEN', field: 'almacen'  ,  width: '140px' },
        {header: 'EQ TRANSPORTE', field: 'equipoTransporte'  ,  width: '180px' },
        {header: 'PUERTA', field: 'puerta'  , width: '140px'   },
        {header: 'PLACA', field: 'placa'  ,  width: '100px'  },
        {header: 'MARCA', field: 'marca' , width: '100px'  },
        {header: 'TIPO VEHICULO', field: 'equipotransporte'  , width: '140px'  },
        {header: 'ESTADO', field: 'fechaEsperada'  , width: '130px'  },
    ];

    this.loading = true;
    this.dateInicio.setDate((new Date()).getDate() - 5);
    this.dateFin.setDate((new Date()).getDate() );
    this.model.fec_ini =  this.dateInicio;
    this.model.fec_fin =  this.dateFin ;

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
      
        this.generealService.getAllAlmacenes().subscribe(resp=> {
          resp.forEach(element => {
            this.almacenes.push({ value: element.id ,  label : element.descripcion});
          });




        this.clienteService.getAllPropietarios('').subscribe(resp => { 
        resp.forEach(element => {
          this.clientes.push({ label: element.razonSocial.toUpperCase() , value: element.id });
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

          this.ordenreciboService.getAllEquipoTransporte(this.model).subscribe(list => {
            this.transportes  = list;
            this.loading = false;
          });
    });
  });


  }

  openDoor(id, almacenId){
    this.router.navigate(['recibo/asignarpuerta',id, almacenId]);
   }
   openEquipoTransporte(id){
    this.router.navigate(['recibo/listaordenrecibida',id]);
   }
   protected filterBanks() {
    if (!this.clientes) {
      return;
    }
    
  }
  buscar(){

    this.loading = true;
    this.model.fec_ini =  this.dateInicio;
    this.model.fec_fin =  this.dateFin ;

    localStorage.setItem('AlmacenId', this.model.AlmacenId);
    localStorage.setItem('PropietarioId', this.model.PropietarioId);
    localStorage.setItem('Intervalo', this.model.intervalo);
    localStorage.setItem('Estado', this.model.EstadoId);


    this.ordenreciboService.getAllEquipoTransporte(this.model).subscribe(list => {
      this.transportes = list;
      this.loading = false;

    });
   }
}


