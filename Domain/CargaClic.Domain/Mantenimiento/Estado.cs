using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using CargaClic.Common;
using CargaClic.Domain.Seguridad;

namespace CargaClic.Domain.Mantenimiento
{
    public class Estado : Entity
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Id { get; set; }
        public string NombreEstado { get; set; }
        public string Descripcion { get; set; }
        public int TablaId {get;set;}
        public ICollection<User> Users {get;set;}
    }
}