using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using CargaClic.Common;
using CargaClic.Data.Domain.Mantenimiento;

namespace CargaClic.Data.Domain.Seguridad
{
    public class User : Entity
    {
        public int Id {get;set;}
        public string Username { get; set; }
        public string NombreCompleto { get; set; }
        public string Email {get;set;}
        public bool EnLinea { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        [Required]
        public byte[] PasswordHash { get; set; }
        [Required]
        public byte[] PasswordSalt { get; set; }
        public int EstadoId { get; set; }
        public ICollection<RolUser> RolUser {get;set;}
        
    }
}