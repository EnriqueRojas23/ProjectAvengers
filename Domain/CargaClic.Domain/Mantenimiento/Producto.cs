using System;
using CargaClic.Common;

namespace CargaClic.Domain.Mantenimiento
{
    public class Producto : Entity
    {
        public Guid Id {get;set;}
        public int ClienteId {get;set;}
        public int AlmacenId {get;set;}
        public int FamiliaId {get;set;}
        public string Codigo {get;set;}
        public string DescripcionLarga {get;set;}
        public int UnidadMedidaId {get;set;}
        public decimal Peso {get;set;}
        public string Metodo {get;set;}

    }
}