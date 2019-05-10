using System;
using System.Collections.Generic;
using Common.QueryContracts;


namespace CargaClic.Contracts.Results.Prerecibo
{
    public class ObtenerOrdenReciboDetalleResult : QueryResult
    {
        public Int64 Id {get;set;}
        public Guid OrdenReciboId {get;set;}
        public string Linea {get;set;}
        public string Codigo {get;set;}
        public Guid ProductoId {get;set;}
        public string Producto {get;set;}
        public string Lote {get;set;}
        public int? HuellaId {get;set;}
        public int EstadoId {get;set;}
        public string Estado {get;set;}
        public int? Cantidad {get;set;}
        public int? CantidadRecibida {get;set;}
        public int? CantidadFaltante {get;set;}
        public int? CantidadSobrante {get;set;}
        public DateTime? FechaExpire {get;set;}
        public DateTime? FechaManufactura {get;set;}
        public int PropietarioId {get;set;}
    }

}