using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using CargaClic.Common;

namespace CargaClic.Domain.Prerecibo
{
    public class OrdenRecibo : Entity
    {
        [Key]
        public Guid Id {get;set;}
        public string NumOrden {get;set;}
        public int PropietarioId {get;set;}
        public string Propietario {get;set;}
        public int AlmacenId {get;set;}
        public string GuiaRemision {get;set;}
        public DateTime FechaEsperada {get;set;}
        public string HoraEsperada {get;set;}
        public int UsuarioRegistro {get;set;}
        public DateTime FechaRegistro {get;set;}
        public long? EquipoTransporteId {get;set;}
        public int EstadoId {get;set;}
        public bool Activo {get;set;}
        public int? UbicacionId {get;set;}
        public ICollection<OrdenReciboDetalle> OrdenDetalle {get;set;}

    }
}