using System;
using System.ComponentModel.DataAnnotations;

namespace CargaClic.Repository.Contracts.Mantenimiento
{
    public class ProductoForRegister
    {
        [Required]
        public Guid Id {get;set;}
        [Required]
        public int ClienteId {get;set;}
        [Required]
        public int FamiliaId {get;set;}
        [Required]
        public string Codigo {get;set;}
        [Required]
        public string DescripcionLarga {get;set;}
        public decimal Peso {get;set;}
        public int UnidadMedidaId {get;set;}
        [Required]
        public int AlmacenId { get; set; }
    }
}