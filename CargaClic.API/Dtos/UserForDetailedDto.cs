using System;

namespace CargaClic.API.Dtos
{
    public class UserForDetailedDto
    {
        public int Id {get;set;}
        public string Username { get; set; }
        public string Nombre { get; set; }
        public string Email {get;set;}
        public bool EnLinea { get; set; }
        public int Edad { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
   
    }
}