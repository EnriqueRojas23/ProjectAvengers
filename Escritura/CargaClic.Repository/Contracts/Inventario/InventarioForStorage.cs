using System;
using System.ComponentModel.DataAnnotations;

namespace CargaClic.Repository.Contracts.Inventario
{
    public class InventarioForStorage
    {
        [Required]
        public long Id {get;set;}
    }
}