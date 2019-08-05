using System;
using System.ComponentModel.DataAnnotations;

namespace CargaClic.API.Dtos.Recepcion
{
    public class OrdenReciboDetalleForIdentifyDto
    {

        public Int64 Id {get;set;}
        public string Lote {get;set;}
        public int HuellaId {get;set;}
        [Required]
        public int EstadoID {get;set;}
        [Required]
        public int CantidadRecibida {get;set;}
        public int? CantidadSobrante {get;set;}
        public int? CantidadFaltante { get;set;}
        public int? UbicacionId { get; set; }
        public String FechaExpire { get;set; }
        public String FechaManufactura { get;set; }
        public int? UnidadMedidaId { get;set; }
        public int? HuellaDetalleId {get;set;}
        public int PropietarioId {get;set;}
        public decimal? Peso {get;set;}

        


    }
}