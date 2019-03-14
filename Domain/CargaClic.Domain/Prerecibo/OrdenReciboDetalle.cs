using System;
using System.ComponentModel.DataAnnotations;
using CargaClic.Common;

namespace CargaClic.Domain.Prerecibo
{
    public class OrdenReciboDetalle : Entity
    {
        [Key]
        public Int64 Id {get;set;}
        public Guid OrdenReciboId {get;set;}
        public string Linea {get;set;}
        public Guid ProductoId {get;set;}
        public string Lote {get;set;}
        public int HuellaId {get;set;}
        public int EstadoID {get;set;}
        public int cantidad {get;set;}


    }
}