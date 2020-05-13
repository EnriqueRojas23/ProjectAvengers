using System;
using System.ComponentModel.DataAnnotations;

namespace CargaClic.API.Dtos.Matenimiento
{
    public class  ProveedorForRegisterDto
    {
        [Required]
        public int maestro_incidencia_id {get;set;}

        [Required]
        public int orden_trabajo_id {get;set;}

        [Required]
        [MinLength(5)]
        [MaxLength(250)]
        public string descripcion { get; set; }

        [Required]
        [MinLength(5)]
        [MaxLength(250)]
        public string observacion { get; set; }
        

        [Required]
        public int usuario_id {get;set;}

    }
}