import { Component, OnInit } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { Dropdownlist } from 'src/app/_models/Constantes';
import { FormControl, NgForm } from '@angular/forms';
import { ClienteService } from 'src/app/_services/Mantenimiento/cliente.service';
import { takeUntil } from 'rxjs/operators';
import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';
import { element } from '@angular/core/src/render3';
import { ProductoService } from 'src/app/_services/Mantenimiento/producto.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevoproducto',
  templateUrl: './nuevoproducto.component.html',
  styleUrls: ['./nuevoproducto.component.css']
})
export class NuevoproductoComponent implements OnInit {
  model: any = {}  ;
  public filteredClientes: ReplaySubject<Dropdownlist[]> = new ReplaySubject<Dropdownlist[]>(1);
  public ClientesCtrl: FormControl = new FormControl();
  public ClientesFilterCtrl: FormControl = new FormControl();
  protected _onDestroy = new Subject<void>();
  clientes: Dropdownlist[] = [];
  familia: Dropdownlist[] = [];
  unidadMedida: Dropdownlist[] = [];
  
  constructor(private clienteService: ClienteService,
    private generalService: GeneralService,
    private alertify : AlertifyService,
    private router: Router,
    private productoService: ProductoService) { }

  ngOnInit() {
    this.clienteService.getAll().subscribe(resp => { 
      resp.forEach(element => {
        this.clientes.push({ val: element.id , viewValue: element.nombre});
      });
      this.filteredClientes.next(this.clientes.slice());
      this.ClientesFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
            this.filterBanks();
          });

    });
    this.generalService.getValorTabla(13).subscribe(resp=> 
      {
        resp.forEach(element => {
          this.familia.push({ val: element.id , viewValue: element.valorPrincipal});
        });
         
      });
      this.generalService.getValorTabla(12).subscribe(resp => 
        {
          resp.forEach(element => {
            this.unidadMedida.push({val: element.id, viewValue: element.valorPrincipal });
          } )
        })
    
  }
  protected filterBanks() {
    if (!this.clientes) {
      return;
    }
    let search = this.ClientesFilterCtrl.value;
    if (!search) {
      this.filteredClientes.next(this.clientes.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredClientes.next(
      this.clientes.filter(bank => bank.viewValue.toLowerCase().indexOf(search) > -1)
    );
    
  }
  registrar(form: NgForm) {
    if (form.invalid) {
      return; 
    }
    this.productoService.registrarProducto(this.model).subscribe(resp => { 
    }, error => {
       this.alertify.error(error);
    }, () => { 
      this.alertify.success("Se registró correctamente.");
      this.router.navigate(['mantenimiento/listadoproducto']);
    });

  }
  cancel(){
    this.router.navigate(['mantenimiento/listadoproducto']);
  }


}
