using System;
using System.ComponentModel.DataAnnotations;

namespace CargaClic.API.Dtos.Recepcion
{
    public class EquipoTransporteForRegisterDto
    {
        public long Id { get;set; }
        public int VehiculoId {get;set;}

        public int TipoId {get;set;}
        public int MarcaId {get;set;}
        public string RazonSocial {get;set;}
        public string Codigo { get;set; }
        public string Brevete {get;set;}
        public string NombreCompleto {get;set;}
        [Required]
        public string Placa{ get;set; }
        [Required]
        public string Ruc{ get;set; }
        [Required]
        public string Dni{ get;set; }
        [Required]
        public Guid OrdenReciboId { get;set; }
        public int marcaVehiculo {get;set;}
        public int tipoVehiculo {get;set;}
        public int PropietarioId {get;set;}
    }
}