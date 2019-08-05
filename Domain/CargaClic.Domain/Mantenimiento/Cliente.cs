using CargaClic.Common;

namespace CargaClic.Domain.Mantenimiento
{
    public class Cliente : Entity
    {
        public int Id {get;set;}
        public string Nombre {get;set;}
        public int TipoDocumentoId {get;set;}
        public string Documento {get;set;}
   
    }
}