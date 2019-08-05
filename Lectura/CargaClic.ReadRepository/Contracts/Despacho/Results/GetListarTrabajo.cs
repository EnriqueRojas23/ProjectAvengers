using System;
using System.Collections.Generic;

namespace CargaClic.ReadRepository.Contracts.Despacho.Results
{
    public class ListarTrabajoResult
    {
        public Int64 Id { get; set; }
        public string WorkNum { get; set; }
        public string Direccion {get;set;}
        public string Propietario { get; set; }
        public DateTime FechaRegistro { get; set; }
        public DateTime? FechaAsignacion { get; set; }
        public DateTime? FechaTermino { get; set; }
        public DateTime? FechaInicio {get;set;}
        public string Estado {get;set;}
        public string Area {get;set;}
        public string Ubicacion {get;set;}
        public int CantidadTotal {get;set;}
        public int CantidadLPN {get;set;}

    }
}