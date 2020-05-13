import { Component, OnInit } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { Dropdownlist } from 'src/app/_models/Constantes';
import { FormControl, NgForm } from '@angular/forms';
import { ClienteService } from 'src/app/_services/Mantenimiento/cliente.service';
import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductoService } from 'src/app/_services/Mantenimiento/producto.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-editarproducto',
  templateUrl: './editarproducto.component.html',
  styleUrls: ['./editarproducto.component.css']
})
export class EditarproductoComponent implements OnInit {

  model: any = {}  ;
  public filteredClientes: ReplaySubject<Dropdownlist[]> = new ReplaySubject<Dropdownlist[]>(1);
  public ClientesCtrl: FormControl = new FormControl();
  public ClientesFilterCtrl: FormControl = new FormControl();
  protected _onDestroy = new Subject<void>();
  clientes: Dropdownlist[] = [];
  familia: Dropdownlist[] = [];
  unidadMedida: Dropdownlist[] = [];
  id: any;
  constructor(private clienteService: ClienteService,
    private generalService: GeneralService,
    private alertify : AlertifyService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productoService: ProductoService) { }

  ngOnInit() {

    this.id  = this.activatedRoute.snapshot.params["uid"];
   

    this.clienteService.getAllPropietarios("").subscribe(resp => { 
      resp.forEach(element => {
        this.clientes.push({ val: element.id , viewValue: element.razonSocial});
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
        });


        this.productoService.get(this.id).subscribe(result=> {
          this.model = result;
          console.log(this.model);
      });
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
    this.productoService.editarProducto(this.model).subscribe(resp => { 
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
