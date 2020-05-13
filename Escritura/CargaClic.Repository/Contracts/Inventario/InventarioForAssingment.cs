using System;
using System.ComponentModel.DataAnnotations;

namespace CargaClic.Repository.Contracts.Inventario
{
    public class InventarioForAssingment
    {
        [Required]
        public int lodId {get;set;}
        [Required]
        public int UbicacionId { get; set; }
        public int AlmacenId {get;set;}
        public long? Id {get;set;}
        public Guid ProductoId { get; set; }
        public string LotNum { get; set; }
        public string FechaExpire { get; set; }
        public int UntQty { get; set; }
        public int? UntCas { get; set; }
        public int? UntPak { get; set; }
        public int UsuarioIngreso { get; set; }
        public int? UbicacionIdUlt { get; set; }
        public int HuellaId { get; set; }
        public int ClienteId { get;set; }
    }
}