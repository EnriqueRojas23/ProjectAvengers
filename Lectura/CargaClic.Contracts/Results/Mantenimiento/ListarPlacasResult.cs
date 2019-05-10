using System;
using System.Collections.Generic;
using Common.QueryContracts;

namespace CargaClic.Contracts.Results.Mantenimiento
{
    public class ListarPlacasResult : QueryResult
    {
        public IEnumerable<ListarPlacasDto> Hits { get;set; }
    }
    public class ListarPlacasDto 
    {
        public int  Id	{get;set;}
        public string  Placa	{get;set;}
        public string  Marca	{get;set;}
        public string  Modelo	{get;set;}
        public string  TipoVehiculo	{get;set;}
        public decimal  PesoBruto	{get;set;}
        public decimal  CargaUtil	{get;set;}
        public int TipoVehiculoId {get;set;}
        public int MarcaId {get;set;}
    }
}