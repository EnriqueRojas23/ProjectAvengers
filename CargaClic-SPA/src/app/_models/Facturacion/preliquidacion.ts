export interface PreLiquidacion {
     id: any;
     productoId	:  any ;
     descripcionLarga	:  string ;
     fechaIngreso	:  string ;
     ultimaLiquidacion	:  string ;
     cantidad	:  number ;
     paletas: number;
     propietario: string;
     fechaLiquidacion: string;
     numLiquidacion: string;
     subTotal: number;
     total: number;
     igv: number;
     estado: string;
}
export interface Serie {
     id: any;
     tipoComprobanteId	:  any ;
     serie	:  string ;
     primerNumero	:  string ;
     ultimoNumero	:  string ;
     usuarioAutorizadoId	:  number ;
     estadoId: number;
}



