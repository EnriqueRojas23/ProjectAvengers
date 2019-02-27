using System;
using System.ComponentModel.DataAnnotations;

namespace CargaClic.API.Dtos
{
    public class UserForUpdateDto
    {

        [Required]
        public int Id { get; set; }
        public string NombreCompleto { get; set; }
        public string Email {get;set;}
        public string Dni{get;set;}
        public bool EnLinea { get; set; }
        public int EstadoId  {get;set;}
        public int _tipo {get; set;}

    }
}