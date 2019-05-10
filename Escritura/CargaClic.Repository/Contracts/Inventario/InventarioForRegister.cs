using System;
using System.ComponentModel.DataAnnotations;

namespace CargaClic.Repository.Contracts.Inventario
{
    public class InventarioForRegister
    {
        
        public long? Id {get;set;}
        [Required]
        public Guid ProductoId { get; set; }
        [Required]
        public int UbicacionId { get; set; }
        public string LotNum { get; set; }
        public string FechaExpire { get; set; }
        [Required]
        public int UntQty { get; set; }
        public int? UntCas { get; set; }
        [Required]
        public int? UntPak { get; set; }
        public int UsuarioIngreso { get; set; }
        public int? UbicacionIdUlt { get; set; }
        [Required]
        public int HuellaId { get; set; }
        [Required]
        public int ClienteId { get;set; }
    }
}