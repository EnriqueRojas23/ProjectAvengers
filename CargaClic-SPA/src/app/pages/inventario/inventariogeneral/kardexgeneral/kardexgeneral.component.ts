import { Component, OnInit, ViewChild } from '@angular/core';
import { InventarioGeneral } from 'src/app/_models/Inventario/inventariogeneral';
import { InventarioService } from 'src/app/_services/Inventario/inventario.service';
import { ClienteService } from 'src/app/_services/Mantenimiento/cliente.service';
import { SelectItem } from 'primeng/components/common/selectitem';
import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';

@Component({
  selector: 'app-kardexgeneral',
  templateUrl: './kardexgeneral.component.html',
  styleUrls: ['./kardexgeneral.component.css']
})
export class KardexgeneralComponent implements OnInit {

  dateInicio: Date = new Date(Date.now()) ;
  dateFin: Date = new Date(Date.now()) ;
  es: any;
  
  public loading = false;

  model: any = [];
  ordenes: InventarioGeneral[] = [];
  clientes: SelectItem[] = [];
  almacenes: SelectItem[] = [];

  
  constructor(private inventarioService: InventarioService 
    ,private generealService : GeneralService
    ,private clienteService: ClienteService) { }

  ngOnInit() {
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

    this.dateInicio.setDate((new Date()).getDate() - 31);
    this.dateFin.setDate((new Date()).getDate() );

    this.model.fec_ini =  this.dateInicio;
    this.model.fec_fin =  this.dateFin ;

    
    this.clienteService.getAllPropietarios('').subscribe(resp => { 
      
      resp.forEach(element => {
        this.clientes.push({ value: element.id , label: element.razonSocial});
      });
     
    });

    this.generealService.getAllAlmacenes().subscribe(resp=> {
      resp.forEach(element => {
        this.almacenes.push({ value: element.id ,  label : element.descripcion});
      });

    });
  }

  buscar(){
    
    var url = "http://104.36.166.65/reptwh/Rep_Kardex.aspx?clienteid=" + String(this.model.PropietarioId) 
    + "&almacenid=" + String(this.model.AlmacenId);

    window.open(url);
  }
}