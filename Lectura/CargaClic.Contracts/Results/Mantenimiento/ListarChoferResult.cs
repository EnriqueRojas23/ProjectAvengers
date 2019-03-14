using System;
using System.Collections.Generic;
using Common.QueryContracts;

namespace CargaClic.Contracts.Results.Mantenimiento
{
    public class ListarChoferResult : QueryResult
    {
        public IEnumerable<ListarChoferDto> Hits { get;set; }
    }
    public class ListarChoferDto 
    {
        public int  Id	{get;set;}
        public string  NombreCompleto	{get;set;}
        public string  Dni	{get;set;}
        public string  Brevete	{get;set;}
        public string  Telefono	{get;set;}
    }
}