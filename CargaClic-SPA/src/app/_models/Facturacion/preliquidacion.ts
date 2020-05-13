export interface PreLiquidacion {
     id: any;
     productoId	:  any ;
     descripcionLarga	:  string ;
     fechaIngreso	:  Date ;
     ultimaLiquidacion	:  string ;
     fechaInicio: Date;
     fechaFin: Date;
     cantidad	:  number ;
     paletas: number;
     propietario: string;
     fechaLiquidacion: Date;
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

export interface Tarifa {
     id: number;
     descripcionLarga: string;
     pos: number;
     ingreso: number;
     salida: number;
     seguro: number;
     montacarga: number;
     movilidad:number;
}



