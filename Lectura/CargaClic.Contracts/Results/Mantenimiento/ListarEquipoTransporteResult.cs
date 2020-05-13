using System;
using System.Collections.Generic;
using Common.QueryContracts;

namespace CargaClic.Contracts.Results.Mantenimiento
{

    public class ListarEquipoTransporteResult : QueryResult
    {
        public IEnumerable<ListarEquipoTransporteDto> Hits { get;set; }
    } 
    public class ListarEquipoTransporteDto 
    {
            public long Id {get;set;}
            public string EquipoTransporte	 {get;set;}
            public string Placa	 {get;set;}
            public string Marca	 {get;set;}
            public string NombreCompleto	 {get;set;}
            public string Estado	 {get;set;}
            public string TipoVehiculo	 {get;set;}
            public string Modelo	 {get;set;}
            public string PesoBruto	 {get;set;}
            public string CargaUtil	 {get;set;}
            public string RazonSocial	 {get;set;}
            public string Dni	 {get;set;}
            public string Brevete {get;set;}
            public string Puerta {get;set;}
            public string Almacen {get;set;}
            public int AlmacenId {get;set;}

    }
}