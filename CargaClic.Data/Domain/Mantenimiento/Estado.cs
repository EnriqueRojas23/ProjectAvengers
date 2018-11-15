using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using CargaClic.Common;
using CargaClic.Data.Domain.Seguridad;

namespace CargaClic.Data.Domain.Mantenimiento
{
    public class Estado : Entity
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Id { get; set; }
        public string NombreEstado { get; set; }
        public string Descripcion { get; set; }
        public ICollection<User> Users {get;set;}
    }
}