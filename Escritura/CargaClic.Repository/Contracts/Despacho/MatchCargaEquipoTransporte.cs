using System;
using System.ComponentModel.DataAnnotations;

namespace CargaClic.API.Dtos.Recepcion
{
   public class  MatchCargaEquipoTransporte
   {
        
        [Required]
        public long EquipoTransporteId {get;set;}
        [Required]
        public long CargaId {get;set;}
    }
}