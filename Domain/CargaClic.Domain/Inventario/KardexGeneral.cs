using System;

namespace CargaClic.Domain.Inventario
{
    public class KardexGeneral
    {
        public long Id { get;set; }
        public long InventarioId {get;set;}
        public long LodId {get;set;}
        public Guid ProductoId { get; set; }
        public string LotNum { get; set; }
        public DateTime? FechaExpire { get; set; }
        public DateTime? FechaManufactura { get; set; }
        public DateTime? FechaSalida { get; set; }
        public int UntQty { get; set; }
        public int? UntCas { get; set; }
        public int? UntPak { get; set; }
        public DateTime FechaRegistro { get; set; }
        public DateTime? FechaUltMovimiento { get; set; }
        public int UsuarioIngreso { get; set; }
        public int HuellaId { get; set; }
        public long? LineaId {get;set;}
        public Guid? OrdenReciboId {get;set;}
        public bool? Almacenado {get;set;}
        public int EstadoId {get;set;}
        public int PropietarioId {get;set;}
        public long? ShipmentLine {get;set;}
        public decimal? Peso {get;set;}
        public string Movimiento {get;set;}

    }
}