using System;
using System.ComponentModel.DataAnnotations;

namespace CargaClic.Repository.Contracts.Inventario
{
    public class InventarioForFinishRecive
    {
        [Required]
        public Guid OrdenReciboId {get;set;}
    }
}