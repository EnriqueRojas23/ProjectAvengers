using System;
using System.ComponentModel.DataAnnotations;
using CargaClic.Common;

namespace CargaClic.Domain.Facturacion
{
    public class Documento : Entity
    {
        [Key]
        public int Id { get; set; }
        public string serie {get;set;}
        public string primernumero {get;set;}
        public string ultimonumero {get;set;}
    }
}