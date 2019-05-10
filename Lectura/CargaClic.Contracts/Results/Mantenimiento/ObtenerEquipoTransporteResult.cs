using System;
using System.Collections.Generic;
using Common.QueryContracts;

namespace CargaClic.Contracts.Results.Mantenimiento
{
    public class ObtenerEquipoTransporteResult : QueryResult
    {
        public long Id {get;set;}
        public string  Placa	{get;set;}
        public string  TipoVehiculo	{get;set;}
        public string  Marca 	{get;set;}
        public string  Modelo	{get;set;}
        public decimal  PesoBruto	{get;set;}
        public decimal  CargaUtil	{get;set;}
        public string  RazonSocial	{get;set;}
        public string  NombreCompleto	{get;set;}
        public string  Dni	{get;set;}
        public string  Brevete	{get;set;}
        public int TipoVehiculoId {get;set;}
        public int MarcaId {get;set;}
        public string Ruc {get;set;}
    }
}