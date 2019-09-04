using System;
using System.Collections.Generic;

namespace CargaClic.ReadRepository.Contracts.Despacho.Results
{
    public class GetAllCargas
    {
        

        public Int64 Id { get; set; }
        public string ShipmentNumber { get; set; }
        public string Propietario { get; set; }
        public DateTime FechaRegistro { get; set; }
        public DateTime FechaRequerida { get; set; }
        public string Placa { get; set; }
        public string Estado { get; set; }
        public string Cliente {get;set;}
        public string Direccion {get;set;}
        public string EquipoTransporte {get;set;}
        

    }
}