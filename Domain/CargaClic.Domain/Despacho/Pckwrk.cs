using System;
using System.ComponentModel.DataAnnotations;
using CargaClic.Common;

namespace CargaClic.Domain.Despacho
{
    public class Pckwrk : Entity
    {
        [Key]
        public long Id { get; set; }
        public int UbicacionId { get; set; }
        public long ShipmentLineId { get; set; }
        public Guid ProductoId { get; set; }
        public DateTime? FechaExpire { get; set; }
        public int? DestinoId {get;set;}
        public int CantidadPallet {get;set;}
        public int CantidadRetiro {get;set;}
        public long OrdenSalidaId { get; set; }
        public int HuellaId { get; set; }
        public int HuellaDetalleId { get; set; }
        public int PropietarioId {get;set;}
        public bool Completo {get;set;}
        public bool Confirmado {get;set;}
        public long WrkId {get;set;}
        public long InventarioId {get;set;}
        public string LodNum {get;set;}
        public DateTime? FechaIngreso {get;set;}
        public DateTime? FechaSalida {get;set;}
        public Guid? OrdenReciboId {get;set;}
        public long? LineaId {get;set;}
        public string LotNum {get;set;}

    }
}