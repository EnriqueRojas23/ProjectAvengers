using System;

namespace CargaClic.ReadRepository.Contracts.Inventario.Parameters
{
    public class GetAllInventarioParameters
    {
        public Guid ProductoId {get;set;}
        public int ClientId {get;set;}
        public int EstadoId {get;set;}
        public int? UbicacionId {get;set;}
        
    }
}