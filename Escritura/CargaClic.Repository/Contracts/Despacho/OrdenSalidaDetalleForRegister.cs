using System;
using System.ComponentModel.DataAnnotations;

namespace CargaClic.API.Dtos.Despacho
{
   public class  OrdenSalidaDetalleForRegister
   {
        
        public long Id {get;set;}
        public string Linea {get;set;}
        public string Lote {get;set;}
        public int EstadoID {get;set;}
        public int HuellaId {get;set;}
        public int Cantidad {get;set;}
        public DateTime? FechaExpire { get;set; }
        public bool? Completo {get;set;}
        public Guid ProductoId {get;set;}
        public long OrdenSalidaId {get;set;}
        public int UnidadMedidaId {get;set;}
        public string Ubicacion {get;set;}
        public string Area {get;set;}
        public int UbicacionId {get;set;}
        public int AreaId {get;set;}
    }
}