using CargaClic.Common;

namespace CargaClic.Domain.Mantenimiento
{
    public class Propietario : Entity
    {
        public int Id {get;set;}
        public string Nombre {get;set;}
        public string NombreCorto {get;set;}
        public int TipoDocumentoId {get;set;}
        public string Documento {get;set;}
        public string Direccion {get;set;}
        public bool Activo {get;set;}
    }
}