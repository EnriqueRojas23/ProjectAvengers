using System;
using System.ComponentModel.DataAnnotations;

namespace CargaClic.API.Dtos.Despacho
{
   public class  MatchCargaEquipoTransporte
   {
        
        [Required]
        public long EquipoTransporteId {get;set;}
        [Required]
        public string CargasId {get;set;}
    }
}