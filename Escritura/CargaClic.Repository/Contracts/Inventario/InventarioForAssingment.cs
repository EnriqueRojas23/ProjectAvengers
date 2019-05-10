using System;
using System.ComponentModel.DataAnnotations;

namespace CargaClic.Repository.Contracts.Inventario
{
    public class InventarioForAssingment
    {
        [Required]
        public string Id {get;set;}
        [Required]
        public int UbicacionId { get; set; }
    }
}