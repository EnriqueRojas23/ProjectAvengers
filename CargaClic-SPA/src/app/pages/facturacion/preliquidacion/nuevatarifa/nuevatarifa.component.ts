import { Component, OnInit, ViewChild } from '@angular/core';
import { Dropdownlist } from 'src/app/_models/Constantes';
import { ClienteService } from 'src/app/_services/Mantenimiento/cliente.service';
import { FormControl, NgForm } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { MatSelect } from '@angular/material';
import { takeUntil } from 'rxjs/operators';
import { FacturacionService } from 'src/app/_services/Facturacion/facturacion.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';
import { ProductoService } from 'src/app/_services/Mantenimiento/producto.service';

@Component({
  selector: 'app-nuevatarifa',
  templateUrl: './nuevatarifa.component.html',
  styleUrls: ['./nuevatarifa.component.css']
})
export class NuevatarifaComponent implements OnInit {

  model: any = {};
  clientes: Dropdownlist[] = [];
  productos: Dropdownlist[] = [];
  
  public ClientesCtrl: FormControl = new FormControl();
  public ClientesFilterCtrl: FormControl = new FormControl();
  public filteredClientes: ReplaySubject<Dropdownlist[]> = new ReplaySubject<Dropdownlist[]>(1);


  public filteredProductos: ReplaySubject<Dropdownlist[]> = new ReplaySubject<Dropdownlist[]>(1);
  public ProductosCtrl: FormControl = new FormControl();
  public ProductosFilterCtrl: FormControl = new FormControl();

  protected _onDestroy = new Subject<void>();
  @ViewChild('singleSelect') singleSelect: MatSelect;
  
  constructor(
    private clienteService: ClienteService,
    private facturacionService: FacturacionService,
    private alertify: AlertifyService,
    private productoService: ProductoService,
    private router: Router 
  ) { }

  ngOnInit() {

    this.clienteService.getAllPropietarios('').subscribe(resp => { 
      resp.forEach(element => {
        this.clientes.push({ val: element.id , viewValue: element.razonSocial});
      });
      this.filteredClientes.next(this.clientes.slice());
      this.ClientesFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
            this.filterBanks();
          });

      }, error => {
      }, () => { 
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
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  
  registrar(form: NgForm){
    if (form.invalid) {
      return; 
    }

    this.facturacionService.insertTarifa(this.model).subscribe(x=> {
      
    },error => {
      this.alertify.error(error);
    },() => {
      this.alertify.success("Se actualizó correctamente.");
      this.router.navigate(['/facturacion/gestiontarifario' ]);
    })
  }
  
  CambioCliente(id){
    this.productos = [];
    
     this.productoService.getAll("",id.val).subscribe(resp=> {

      resp.forEach(element => {
        this.productos.push({ val: element.id , viewValue: element.descripcionLarga});
      });  

      this.filteredProductos.next(this.productos.slice());
      this.ProductosFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
            this.filterProductos();
          });

     })
  }
  protected filterProductos() {
    if (!this.productos) {
      return;
    }
    let search = this.ProductosFilterCtrl.value;
    if (!search) {
      this.filteredProductos.next(this.productos.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredProductos.next(
      this.productos.filter(bank => bank.viewValue.toLowerCase().indexOf(search) > -1)
    );
  }



}
