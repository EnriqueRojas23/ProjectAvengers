
export interface Comprobante {
     id: any;
     tipoComprobanteId	:  any ;
     numeroComprobante	:  string ;
     preliquidacionId	:  string ;
     clienteId	:  string ;
     fechaEmision	:  number ;
     usuarioRegistroId: number;
     subtotal	:  number ;
     igv	:  number ;
     total	:  number ;
     motivo: string;
     descripcion: string ;
     facturaVinculadaId: string;
     estadoId: number;
     ordenCompra: string;
}


export interface ComprobanteDetalle {
     id: any;
     comprobanteId: any ;
     cantidad: number;
     descripcion: string ;
     subtotal: number ;
     igv: number ;
     total: number ;
     recargo: number;
}

