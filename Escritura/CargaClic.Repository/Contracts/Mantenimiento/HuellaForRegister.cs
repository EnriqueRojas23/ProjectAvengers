using System;
using System.ComponentModel.DataAnnotations;

namespace CargaClic.Repository.Contracts.Mantenimiento
{
    public class HuellaForRegister
    {
        
        [Required]
        public Guid ProductoId {get;set;}
        [Required]
        public string CodigoHuella {get;set;}
        [Required]
        public int Caslvl {get;set;}
        public DateTime FechaRegistro {get;set;}
        public int UsuarioRegistroId {get;set;}

    }
}