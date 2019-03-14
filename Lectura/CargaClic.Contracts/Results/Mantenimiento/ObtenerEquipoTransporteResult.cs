using System;
using System.Collections.Generic;
using Common.QueryContracts;

namespace CargaClic.Contracts.Results.Mantenimiento
{
    public class ObtenerEquipoTransporteResult : QueryResult
    {
        public int  Placa	{get;set;}
        public string  TipoVehiculo	{get;set;}
        public string  Marca 	{get;set;}
        public string  Modelo	{get;set;}
        public string  PesoBruto	{get;set;}
        public string  CargaUtil	{get;set;}
        public string  RazonSocial	{get;set;}
        public string  NombreCompleto	{get;set;}
        public string  Dni	{get;set;}
        public string  Brevete	{get;set;}
    }
}