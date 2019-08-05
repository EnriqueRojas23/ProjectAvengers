using System;

namespace CargaClic.ReadRepository.Contracts.Despacho.Results
{
    public class GetPendientesLiquidacion
    {
        public long Id {get;set;}
        public Guid ProductoId {get;set;}
        public string DescripcionLarga {get;set;}
        public string FechaIngreso {get;set;}
        public decimal Tarifa {get;set;}
        public decimal Ingreso {get;set;}
        public decimal Salida {get;set;}
        public int EstadiaTotal {get;set;}
        public string UltimaLiquidacion {get;set;}
        public int EstadiaUltima {get;set;}
        public decimal Posdia {get;set;}
        public decimal PosTotal{get;set;}
        public int Cantidad {get;set;}
        public int Paletas {get;set;}
        public decimal Total {get;set;}
        
       
        
    }
}