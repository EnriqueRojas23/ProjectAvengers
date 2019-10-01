using System;
using System.ComponentModel.DataAnnotations;

namespace CargaClic.API.Dtos.Recepcion
{
   public class  PreliquidacionForRegister
   {
        public int ClienteId { get; set; }
        public string InicioCorte {get;set;}
        public string FinCorte {get;set;}
   }
}