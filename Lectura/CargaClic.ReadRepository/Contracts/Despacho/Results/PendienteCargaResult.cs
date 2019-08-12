using System;
using System.Collections.Generic;

namespace CargaClic.ReadRepository.Contracts.Despacho.Results
{
    public class PendienteCargaResult
    {
        
        public Int64 Id { get; set; }
        public string Codigo {get;set;}
        public string Producto {get;set;}

        public int  Cantidad {get;set;}
        public int  EstadoId {get;set;}
        public decimal Peso {get;set;}

        public string Familia {get;set;}
        public string UnidadMedida {get;set;}

        public DateTime FechaRequerida {get;set;}
        public DateTime FechaRegistro {get;set;}
        public string HoraRequerida {get;set;}
        

    }
}