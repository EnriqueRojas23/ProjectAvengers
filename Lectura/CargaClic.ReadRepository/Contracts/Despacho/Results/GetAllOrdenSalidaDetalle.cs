using System;

namespace CargaClic.ReadRepository.Contracts.Despacho.Results
{
    public class GetAllOrdenSalidaDetalle
    {
        public Int64 Id {get;set;}
        public Int64 OrdenSalidaId {get;set;}
        public string Linea {get;set;}
        public string Codigo {get;set;}
        public Guid ProductoId {get;set;}
        public string Producto {get;set;}
        public string Lote {get;set;}
        public int? HuellaId {get;set;}
        public int EstadoId {get;set;}
        public string Estado {get;set;}
        public int? Cantidad {get;set;}
        
    }
}