using System;

namespace CargaClic.ReadRepository.Contracts.Inventario.Results
{
    public class GetAllInventarioResult
    {
            public long Id	{get;set;}
            public string LodNum	{get;set;}
            public Guid ProductoId	{get;set;}
            public string DescripcionLarga	{get;set;}
            public int UbicacionId	{get;set;}
            public string Ubicacion	{get;set;}
            public string UbicacionProxima	{get;set;}
            public string LotNum	{get;set;}
            public DateTime FechaExpire	{get;set;}
            public int UntQty	{get;set;}
            public int UntPak	{get;set;}
            public DateTime FechaRegistro	{get;set;}
            public DateTime FechaUltMovimiento	{get;set;}
            public DateTime FechaEsperada {get;set;}
            public int UsuarioIngreso	{get;set;}
            public string UbicacionIdUlt	{get;set;}
            public int HuellaId	{get;set;}
            public string CodigoHuella{get;set;}
            public bool Almacenado {get;set;}
            public string Area {get;set;}
    }
}