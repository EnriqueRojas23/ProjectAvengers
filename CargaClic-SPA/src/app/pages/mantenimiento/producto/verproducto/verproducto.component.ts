import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/_services/Mantenimiento/producto.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verproducto',
  templateUrl: './verproducto.component.html',
  styleUrls: ['./verproducto.component.css']
})
export class VerproductoComponent implements OnInit {
  id: any;
  model: any = {};
  
  constructor(private productoService: ProductoService
    ,private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.id  = this.activatedRoute.snapshot.params["uid"];
    this.productoService.get(this.id).subscribe(result=> {
        console.log(result);
    })
  }

}
