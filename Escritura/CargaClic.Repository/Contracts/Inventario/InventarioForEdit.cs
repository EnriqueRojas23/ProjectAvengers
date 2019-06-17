using System;
using System.ComponentModel.DataAnnotations;

namespace CargaClic.Repository.Contracts.Inventario
{
    public class InventarioForEdit
    {
        public long? Id {get;set;}
        public string LotNum { get; set; }
        public string FechaExpire { get; set; }
        public string FechaManufactura { get; set; }
        public int UntQty { get; set; }
        public int UsuarioActualizar { get; set; }
        public int EstadoId {get;set;}
    }
}