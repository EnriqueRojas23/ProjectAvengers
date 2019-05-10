using System;
using System.Collections.Generic;
using Common.QueryContracts;

namespace CargaClic.Contracts.Results.Prerecibo
{
    public class ListarUbicacionesResult : QueryResult
    {
        public IEnumerable<ListarUbicacionesDto> Hits { get;set; }
    }
    public class ListarUbicacionesDto 
    {
        public int  Id	{get;set;}
        public string  Ubicacion	{get;set;}
        public string  Area	{get;set;}
        public string  Estado	{get;set;}
        public string Almacen {get;set;}
        
    }
}