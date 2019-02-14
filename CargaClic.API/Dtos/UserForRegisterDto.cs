using System;
using System.ComponentModel.DataAnnotations;

namespace CargaClic.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string Username { get; set; }
        [Required]
        [StringLength(8, MinimumLength = 4, ErrorMessage="You must specify password between 4 and 8 characters" )]
        public string Password { get; set; }
        [Required]
        public string NombreCompleto { get; set; }
        [Required]
        public string Email {get;set;}
        [Required]
        public string Dni{get;set;}
        public bool EnLinea { get; set; }
        public DateTime? Created { get; set; }
        public DateTime? LastActive { get; set; }
        public int EstadoId  {get;set;}
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }

    }
}