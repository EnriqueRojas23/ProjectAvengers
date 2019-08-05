using System;
using System.ComponentModel.DataAnnotations;
using CargaClic.Common;

namespace CargaClic.Domain.Despacho
{
    public class Wrk : Entity
    {
        [Key]
        public long Id { get; set; }
        public string WorkNum { get; set; }
        public DateTime FechaRegistro { get; set; }
        public DateTime? FechaAsignacion {get;set;}
        public int UsuarioId {get;set;}
        public int EstadoId {get;set;}
        public DateTime? FechaInicio {get;set;}
        public DateTime? FechaTermino { get; set; }
        public int PropietarioId {get;set;}
        public int DireccionId {get;set;}
        public int? DestinoId {get;set;}
        
    }
}