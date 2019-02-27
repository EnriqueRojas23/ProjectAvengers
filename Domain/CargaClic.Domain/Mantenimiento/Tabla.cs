using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using CargaClic.Common;

namespace CargaClic.Domain.Mantenimiento
{

    public class Tabla : Entity
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Id { get; set; }  
        public string NombreTabla { get; set; }
        public ICollection<Estado> Estados {get;set;}
    }
}