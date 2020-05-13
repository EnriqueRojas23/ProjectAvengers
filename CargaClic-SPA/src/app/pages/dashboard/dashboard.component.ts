import { Component, OnInit } from '@angular/core';
import { InventarioService } from 'src/app/_services/Inventario/inventario.service';
import { Chart } from 'chart.js';
import { ClienteService } from 'src/app/_services/Mantenimiento/cliente.service';
import { SelectItem } from 'primeng/components/common/selectitem';
import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';
declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  chart: any = [];
  data: any = [];
  data1: any = [];


  chart1: any = [];
  data2: any = [];
  data21: any = [];


  labels: any = [];
  clientes: SelectItem[] = [];
  model: any = {};
  almacenes: SelectItem[] = [];

  
  constructor(private inventarioService: InventarioService,
    private clienteService: ClienteService, 
    private generealService : GeneralService,) {
  }

  ngOnInit() {

    this.clienteService.getAllPropietarios('').subscribe(resp => { 
      resp.forEach(element => {
        this.clientes.push({ label: element.razonSocial.toUpperCase() , value: element.id });
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
       if(localStorage.getItem('AlmacenId') == null || localStorage.getItem('AlmacenId') == 'undefined') {
        this.model.AlmacenId = 1;
      }
      else {
          this.model.AlmacenId = parseInt(localStorage.getItem('AlmacenId'));
      }

      this.inventarioService.getGraficoRecepcion(this.model.PropietarioId, this.model.AlmacenId).subscribe( resp=> {
         
      
          resp.forEach(element => {
                this.data2.push(element.nombreEstado);
                this.data21.push(element.cantidad);
            });
 
         
             this.chart1 = new Chart('canvas1', {
             type: 'horizontalBar',
            
             data: {
              labels: this.data2,
              datasets: [
                 {
                   label: "Stock",
                   data:   this.data21 ,
                   backgroundColor: [
                    'rgba(0, 99, 132, 0.6)',
                    'rgba(30, 99, 132, 0.6)',
                    'rgba(60, 99, 132, 0.6)',
                    'rgba(90, 99, 132, 0.6)',
                    'rgba(120, 99, 132, 0.6)',
       
                  ],
                 },
               ],
           
             },
         
             options: {
               cutoutPercentage: 100,
               legend: {
                display: true,
                position: 'top',
                labels: {
                  boxWidth: 80,
                  fontColor: 'black'
                },
                scales: {
        
                    yAxes: [{
                       gridLines: {
                        display: false
                      }
                    }],
                    xAxes: [{
                      ticks: {
                         min: 0
                        ,max: 20
                        ,callback: function(val) {
                          if(val == 0 ) {
                              return null;
                          }
                          return Number.isInteger(val) ? val : null;
                        },
                        
                      },
                       gridLines: {
                        display: false
                       }
                     
                      }],
                },
                elements: {
                  rectangle: {
                    borderSkipped: 'left',
                  }
                }

                 // animation: {
                 //   animateRotate: true,
                 //   animateScale: true
                 // }
               }}
             
               });
              });

    this.inventarioService.getGraficoStock(this.model.PropietarioId, this.model.AlmacenId).subscribe( resp=> {
              
          resp.forEach(element => {
                this.data.push(element.descripcionLarga);
                this.data1.push(element.untQty);
            });
 
         
             this.chart = new Chart('canvas2', {
             type: 'horizontalBar',
            
             data: {
              labels: this.data,
              datasets: [
                 {
                   label: "Stock",
                   data:   this.data1 ,
                   backgroundColor: [
                    'rgba(0, 99, 132, 0.6)',
                    'rgba(30, 99, 132, 0.6)',
                    'rgba(60, 99, 132, 0.6)',
                    'rgba(90, 99, 132, 0.6)',
                    'rgba(120, 99, 132, 0.6)',
                    'rgba(150, 99, 132, 0.6)',
                    'rgba(180, 99, 132, 0.6)',
                    'rgba(210, 99, 132, 0.6)',
                    'rgba(240, 99, 132, 0.6)',
                    'rgba(0, 99, 132, 0.6)',
                    'rgba(30, 99, 132, 0.6)',
                    'rgba(60, 99, 132, 0.6)',
                    'rgba(90, 99, 132, 0.6)',
                    'rgba(120, 99, 132, 0.6)',
                    'rgba(150, 99, 132, 0.6)'
                  ],
                 },
               ],
           
             },
         
             options: {
               
             
               cutoutPercentage: 10,
         
               legend: {
                display: true,
                position: 'top',
                labels: {
                  boxWidth: 80,
                  fontColor: 'black'
                },
                scales: {
                  xAxes: [{
                    barPercentage: 1,
                    gridLines: {
                      display: false
                    }
                    }],
                    yAxes: [{
                      ticks: {
                        
                        stepSize: 1
                      },
                       gridLines: {
                        display: false
                      }
                    }]
                },
                elements: {
                  rectangle: {
                    borderSkipped: 'left',
                  }
                }

                 // animation: {
                 //   animateRotate: true,
                 //   animateScale: true
                 // }
               }}
             
               });
              });
            });
          });
      }
      position_StockPorProducto(){
        $("html,body").animate({ scrollTop: 240 }, "slow");
      }
      position_filtros(){
        $("html,body").animate({ scrollTop: 0 }, "slow");
      }
      position_cumplimientoentrega(){
        $("html,body").animate({ scrollTop: 880 }, "slow");
      }

      buscar() { 
        
        this.inventarioService.getGraficoRecepcion(this.model.PropietarioId, this.model.AlmacenId).subscribe( resp=> {
          this.data2 = [];
          this.data21 = [];
      
        resp.forEach(element => {
              this.data2.push(element.nombreEstado);
              this.data21.push(element.cantidad);
          });
          this.chart1.data.labels = this.data2;
          this.chart1.data.datasets[0].data = this.data21;
          this.chart1.update();

        });

        this.inventarioService.getGraficoStock(this.model.PropietarioId, this.model.AlmacenId).subscribe( resp=> {
              
          this.data = [];
          this.data1 = [];
              

              resp.forEach(element => {
                this.data.push(element.descripcionLarga);
                this.data1.push(element.untQty);
            });
          
               this.chart.data.labels = this.data;
               this.chart.data.datasets[0].data = this.data1;
               this.chart.update();


              //  this.chart3.data.datasets[0].data = [((list.ok * 100) / list.total).toFixed(0)   , ((list.pendientes* 100) / list.total).toFixed(0)  ];
              //  this.chart3.update();
   
         });

      }

}
