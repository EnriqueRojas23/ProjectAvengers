using System;
using System.ComponentModel.DataAnnotations;

namespace CargaClic.API.Dtos
{
    public class RolForAddOptionDto
    {
        
        [Required]
        public int IdRol { get; set; }
        [Required]
        public int IdPagina { get; set; }
        public string permisos { get; set; }   

    }
}