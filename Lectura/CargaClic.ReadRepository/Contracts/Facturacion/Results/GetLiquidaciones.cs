using System;

namespace CargaClic.ReadRepository.Contracts.Despacho.Results
{
    public class GetLiquidaciones
    {
        public long Id {get;set;}
        public string NumLiquidacion {get;set;}
        public string Propietario {get;set;}
        public string FechaLiquidacion {get;set;}
        public decimal SubTotal {get;set;}
        public decimal Igv {get;set;}
        public decimal Total {get;set;}
        public string Estado {get;set;}
        
    }
}