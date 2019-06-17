using System;
using System.Collections.Generic;
using Common.QueryContracts;


namespace CargaClic.Contracts.Results.Prerecibo
{
    public class ObtenerOrdenReciboResult : QueryResult
    {
        public Guid  OrdenReciboId	{get;set;}
        public string  NumOrden	{get;set;}
        public int  PropietarioId	{get;set;}
        public string  Propietario	{get;set;}
        public int  AlmacenId	{get;set;}
        public string  Almacen	{get;set;}
        public string  GuiaRemision	{get;set;}
        public DateTime  FechaEsperada	{get;set;}
        public DateTime  FechaRegistro	{get;set;}
        public string HoraEsperada {get;set;}
        public int  EstadoID	{get;set;}
        public string  NombreEstado{get;set;}
        public IEnumerable<ListarOrdenReciboDetalleDto> Detalles {get;set;}

    }
    public class ListarOrdenReciboDetalleDto
    {
        public Int64 Id {get;set;}
        public Guid OrdenReciboId {get;set;}
        public string Linea {get;set;}
        public string Codigo {get;set;}
        public Guid ProductoId {get;set;}
        public string Producto {get;set;}
        public string Lote {get;set;}
        public int HuellaId {get;set;}
        public int EstadoId {get;set;}
        public string Estado {get;set;}
        public bool Completo {get;set;}
        public int Cantidad {get;set;}
        public int? CantidadRecibida {get;set;}
    }

}