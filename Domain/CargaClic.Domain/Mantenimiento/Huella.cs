using System;
using CargaClic.Common;

namespace CargaClic.Domain.Mantenimiento
{
    public class Huella : Entity
    {
        public int Id {get;set;}
        public Guid ProductoId {get;set;}
        public string CodigoHuella {get;set;}
        public int Caslvl {get;set;}
        public DateTime FechaRegistro {get;set;}
       

    }
    public class HuellaDetalle : Entity
    {
        public int Id {get;set;}
        public int HuellaId {get;set;}
        public int? Nivel {get;set;}
        public bool Pallet { get;set; }
        public bool Cas { get;set; } // unidad de medida mínimo
        public decimal Height {get;set;}
        public decimal Length {get;set;}
        public decimal Width {get;set;}
        public decimal Grswgt {get;set;}
        public decimal Netwgt {get;set;}
        public int UnidadMedidaId {get;set;}
        public int UntQty {get;set;}    
    }
}