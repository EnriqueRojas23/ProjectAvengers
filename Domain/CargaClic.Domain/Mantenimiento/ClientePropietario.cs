using CargaClic.Common;

namespace CargaClic.Domain.Mantenimiento
{
    public class ClientePropietario : Entity
    {
        public int Id {get;set;}
        public int PropietarioId {get;set;}
        public int ClienteId {get;set;}
    }
}