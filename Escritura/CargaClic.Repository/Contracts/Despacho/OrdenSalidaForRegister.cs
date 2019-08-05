using System;
using System.ComponentModel.DataAnnotations;

namespace CargaClic.API.Dtos.Despacho
{
   public class  OrdenSalidaForRegister
   {
        public int PropietarioId { get; set; }
        public string Propietario { get; set; }
        public string NumOrden {get;set;}
        public int AlmacenId { get; set; }
        public string GuiaRemision { get; set; }
        public String FechaRequerida { get; set; }
        public string HoraRequerida {get;set;}
        public string OrdenCompraCliente { get; set; }
        public DateTime FechaRegistro { get; set; }
        public int ClienteId { get; set; }
        public int IdDireccion { get; set; }
        public long? EquipoTransporteId { get; set; }
        public int EstadoId {get;set;}
        public int UsuarioRegistro {get;set;}
        public int UbicacionId {get;set;}
        
    }
}