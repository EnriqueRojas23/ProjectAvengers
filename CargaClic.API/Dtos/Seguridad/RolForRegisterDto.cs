using System;
using System.ComponentModel.DataAnnotations;

namespace CargaClic.API.Dtos
{
    public class RolForRegisterDto
    {
        
        [Required]
        [StringLength(8, MinimumLength = 5, ErrorMessage="You must specify password between 4 and 8 characters" )]
        public string Alias { get; set; }
        [Required]
        [StringLength(50, MinimumLength = 4, ErrorMessage="You must specify password between 4 and 8 characters" )]
        public string Descripcion { get; set; }
        public bool Activo { get; set; }
        public bool Publico {get;set;}

    }
}