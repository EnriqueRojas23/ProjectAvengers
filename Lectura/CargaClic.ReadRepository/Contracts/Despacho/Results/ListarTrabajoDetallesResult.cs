using System;
using System.Collections.Generic;

namespace CargaClic.ReadRepository.Contracts.Despacho.Results
{
    public class ListarTrabajoDetallesResult
    {
        public Int64 Id { get; set; }
        public string LodNum { get; set; }
        public string LotNum { get; set; }
        public int CantidadPallet {get;set;}
        public int CantidadRetiro {get;set;}
        public bool Completo { get; set; }
        public DateTime FechaExpire { get; set; }
        public bool Confirmado {get;set;}
        public string Ubicacion {get;set;}
        public string Destino {get;set;}
        public string DescripcionLarga {get;set;}
        public string Lote {get;set;}
    }
}