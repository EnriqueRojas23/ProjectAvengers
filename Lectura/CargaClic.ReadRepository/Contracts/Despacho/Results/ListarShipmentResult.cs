using System;

namespace CargaClic.ReadRepository.Contracts.Despacho.Results
{
    public class ListarShipmentResult
    {
        public long Id { get; set; }
        public string ShipmentNumber { get; set; }
        public string Propietario { get; set; }
        public DateTime FechaRegistro { get; set; }
        public string Cliente { get; set; }
        public string Direccion { get; set; }
        public string Estado {get;set;}

    }
    public class ListarShipmentDetalleResult
    {
        public long Id { get; set; }
        public string Codigo { get; set; }
        public string DescripcionLarga { get; set; }
        public string Metodo { get; set; }
        public int Cantidad { get; set; }
    }

}