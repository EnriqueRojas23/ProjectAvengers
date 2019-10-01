using System;

namespace CargaClic.ReadRepository.Contracts.Despacho.Results
{
    public class GetTarifas
    {
        public int Id	{get;set;}
        public string DescripcionLarga	{get;set;}
        public decimal Pos	{get;set;}
        public decimal Ingreso	{get;set;}
        public decimal Salida	{get;set;}
        public decimal Seguro	{get;set;}
        public decimal Montacarga	{get;set;}
        public decimal Movilidad {get;set;}
        
    }
}