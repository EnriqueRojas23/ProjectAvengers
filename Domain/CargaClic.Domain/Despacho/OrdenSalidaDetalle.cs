using System;
using System.ComponentModel.DataAnnotations;
using CargaClic.Common;

namespace CargaClic.Domain.Despacho
{
    public class OrdenSalidaDetalle : Entity
    {
        [Key]
        public Int64 Id {get;set;}
        public Int64 OrdenSalidaId {get;set;}
        public string Linea {get;set;}
        public Guid ProductoId {get;set;}
        public string Lote {get;set;}
        public int? HuellaId {get;set;}
        public int EstadoId {get;set;}
        public int Cantidad {get;set;}
        public bool? Completo {get;set;}
        public int UnidadMedidaId {get;set;}
    }
}