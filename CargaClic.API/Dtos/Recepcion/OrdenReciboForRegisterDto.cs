using System;
using System.ComponentModel.DataAnnotations;

namespace CargaClic.API.Dtos.Recepcion
{
    public class OrdenReciboForRegisterDto
    {

        public Guid Id {get;set;}
        public string NumOrden {get;set;}
        [Required]
        public int PropietarioId{get;set;}
        [Required]
        public string Propietario {get;set;}
        [Required]
        public int AlmacenId {get;set;}
        [MaxLength(15)]
        public string GuiaRemision {get;set;}
        [Required]
        public string FechaEsperada {get;set;}
        [Required]
        public string HoraEsperada {get;set;}
        [Required]
        public int EstadoID {get;set;}
        //[Required]
        public string FechaRegistro {get;set;}
        //[Required]
        public int UsuarioRegistro {get;set;}
    }
}