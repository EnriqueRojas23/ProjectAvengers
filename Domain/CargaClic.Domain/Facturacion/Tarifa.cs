using System;
using System.ComponentModel.DataAnnotations;
using CargaClic.Common;

namespace CargaClic.Domain.Facturacion
{
    public class Tarifa : Entity
    {
        [Key]
        public int Id { get; set; }
        public int ClienteId { get; set; }
        public Guid ProductoId { get; set; }
        public decimal Pos {get;set;}
        public decimal Ingreso {get;set;}
        public decimal Salida {get;set;}
        public decimal Seguro {get;set;}
    }
}