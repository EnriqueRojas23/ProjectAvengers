using System;
using System.ComponentModel.DataAnnotations;

namespace CargaClic.Repository.Contracts.Mantenimiento
{
    public class HuellaDetalleForRegister
    {
        [Required]
        public int Id {get;set;}
        [Required]
        public decimal Height {get;set;}
        [Required]
        public decimal Length {get;set;}
        [Required]
        public decimal Width {get;set;}
        [Required]
        public decimal Grswgt {get;set;}
        [Required]
        public decimal Netwgt {get;set;}
        [Required]
        public int UnidadMedidaId {get;set;}
        [Required]
        public int HuellaId {get;set;}
        [Required]
        public int UntQty {get;set;}

    }
}