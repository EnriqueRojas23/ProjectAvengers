using System;
using System.ComponentModel.DataAnnotations;

namespace CargaClic.API.Dtos.Recepcion
{
    public class OrdenReciboDetalleForRegisterDto
    {

        
        public Int64 Id {get;set;}
        [Required]
        public Guid OrdenReciboId {get;set;}
        [Required]
        public string Linea {get;set;}
        [Required]
        public Guid ProductoId {get;set;}
        public string Lote {get;set;}
        public int? HuellaId {get;set;}
        [Required]
        public int EstadoID {get;set;}
        [Required]
        public int cantidad {get;set;}
    }
}