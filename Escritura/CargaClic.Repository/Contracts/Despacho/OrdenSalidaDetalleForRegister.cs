using System;
using System.ComponentModel.DataAnnotations;

namespace CargaClic.API.Dtos.Recepcion
{
   public class  OrdenSalidaDetalleForRegister
   {
        
        [Required]
        public string Linea {get;set;}
        public string Lote {get;set;}
        [Required]
        public int EstadoID {get;set;}
        public int HuellaId {get;set;}
        [Required]
        public int Cantidad {get;set;}
        public DateTime? FechaExpire { get;set; }
        public bool? Completo {get;set;}
        public Guid ProductoId {get;set;}
        public long OrdenSalidaId {get;set;}
        public int UnidadMedidaId {get;set;}
    }
}