using System;
using System.Collections.Generic;
using Common.QueryContracts;

namespace CargaClic.Contracts.Results.Mantenimiento
{
    public class ListarProveedorResult : QueryResult
    {
        public IEnumerable<ListarProveedorDto> Hits { get;set; }
    }
    public class ListarProveedorDto 
    {
        public int  Id	{get;set;}
        public string  Ruc	{get;set;}
        public string  RazonSocial 	{get;set;}
    }
}