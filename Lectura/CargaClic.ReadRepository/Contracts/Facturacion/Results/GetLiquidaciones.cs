using System;

namespace CargaClic.ReadRepository.Contracts.Despacho.Results
{
    public class GetLiquidaciones
    {
        public long Id {get;set;}
        public string NumLiquidacion {get;set;}
        public string Propietario {get;set;}
        public DateTime FechaLiquidacion {get;set;}
        public DateTime? FechaInicio {get;set;}
        public DateTime? FechaFin {get;set;}
        public decimal SubTotal {get;set;}
        public decimal Igv {get;set;}
        public decimal Total {get;set;}
        public String Estado {get;set;}
        
    }
}