using System;
using System.ComponentModel.DataAnnotations;

namespace CargaClic.Repository.Contracts.Mantenimiento
{
    public class OwnerForRegister
    {
        [Required]
        public int Id {get;set;}
        [Required]
        public string Nombre {get;set;}
        [Required]
        public string NombreCorto {get;set;}
        [Required]
        public int TipoDocumentoId {get;set;}
        [Required]
        public string Documento {get;set;}
        public bool Activo {get;set;}
    }
    public class ClienteForRegister
    {
        [Required]
        public string Nombre {get;set;}
        [Required]
        public int TipoDocumentoId {get;set;}
        [Required]
        public string Documento {get;set;}
        [Required]
        public int PropietarioId {get;set;}
    }
    public class OwnerClientForAttach
    {
        public int ClienteId {get;set;}
        public int PropietarioId {get;set;}
    }
}