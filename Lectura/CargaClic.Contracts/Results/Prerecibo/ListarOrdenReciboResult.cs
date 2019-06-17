using System;
using System.Collections.Generic;
using Common.QueryContracts;

namespace CargaClic.Contracts.Results.Prerecibo
{
    public class ListarOrdenReciboResult : QueryResult
    {
        public IEnumerable<ListarOrdenReciboDto> Hits { get;set; }
    }
    public class ListarOrdenReciboDto 
    {
        public Guid  OrdenReciboId	{get;set;}
        public string  NumOrden	{get;set;}
        public int  PropietarioID	{get;set;}
        public string  Propietario	{get;set;}
        public int  AlmacenID	{get;set;}
        public string  Almacen	{get;set;}
        public string  GuiaRemision	{get;set;}
        public DateTime  FechaEsperada	{get;set;}
        public DateTime  FechaRegistro	{get;set;}
        public int  EstadoID	{get;set;}
        public string  NombreEstado{get;set;}
        
        public string HoraEsperada {get;set;}
        public string transportista {get;set;}
        public string placa {get;set; }
        public string equipotransporte {get;set;}
        public string urgente {get;set;}
        public string chofer {get;set;}
        public string  Ubicacion {get;set;}
        
    }
}