using System;

namespace CargaClic.ReadRepository.Contracts.Despacho.Results
{
    public class GetPendientesLiquidacion
    {
        public Guid Id{get;set;}
        public string Producto {get;set;}
        public decimal Tarifa {get;set;}
        public decimal In {get;set;}
        public decimal Out {get;set;}
        public decimal Posdia {get;set;}
        public decimal Seguro {get;set;}
        public int Cantidad {get;set;}
        public int Pallets {get;set;}
        public decimal PosTotal{get;set;}
        public decimal Total {get;set;}
        
       
        
    }
}