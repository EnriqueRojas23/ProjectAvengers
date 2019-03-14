using System;
using System.ComponentModel.DataAnnotations;

namespace CargaClic.API.Dtos.Recepcion
{
    public class EquipoTransporteForRegisterDto
    {
        public long Id { get;set; }
        public string Codigo { get;set; }
        [Required]
        public string Placa{ get;set; }
        [Required]
        public string Ruc{ get;set; }
        [Required]
        public string Dni{ get;set; }
        [Required]
        public Guid OrdenReciboId { get;set; }
    }
}