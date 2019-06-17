using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using CargaClic.Common;

namespace CargaClic.Domain.Despacho
{
    public class OrdenSalida : Entity
    {
        [Key]
        public Int64 Id {get;set;}
        public int PropietarioId {get;set;}
        public string Propietario {get;set;}
        public int AlmacenId {get;set;}
        public string NumOrden {get;set;}
        public string GuiaRemision {get;set;}        
        public DateTime FechaRequerida {get;set;}
        public string HoraRequerida {get;set;}
        public DateTime FechaRegistro {get;set;}
        public int UsuarioRegistro {get;set;}
        public long? EquipoTransporteId {get;set;}
        public int EstadoId {get;set;}
        public bool Activo {get;set;}
        public int DireccionId {get;set;}
        public int? UbicacionId {get;set;}
        public string OrdenCompraCliente {get;set;}
        public int ClienteId {get;set;}
        public long? CargaId  {get;set;}
        public ICollection<OrdenSalidaDetalle> OrdenDetalle {get;set;}

    }
}