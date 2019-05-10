using System;
using System.Collections.Generic;
using Common.QueryContracts;

namespace CargaClic.Contracts.Results.Mantenimiento
{
    public class ListarProductosResult : QueryResult
    {
        public IEnumerable<ListarProductosDto> Hits { get;set; }
    }
    public class ListarProductosDto 
    {
        public Guid  Id	{get;set;}  
        public int  ClienteId	{get;set;}
        public string Cliente {get;set;}
        public int  AlmacenId	{get;set;}
        public string Almacen {get;set;}
        public int  FamiliaId	{get;set;}
        public string Familia {get;set;}
        public string  Codigo	{get;set;}
        public string  DescripcionLarga	{get;set;}
    }
}