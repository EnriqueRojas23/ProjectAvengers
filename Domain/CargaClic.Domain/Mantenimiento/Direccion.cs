using CargaClic.Common;

namespace CargaClic.Domain.Mantenimiento
{
    public class Direccion : Entity
    {
        public int iddireccion {get;set;}
        public string codigo {get;set;}
        public string direccion {get;set;}
        public int iddistrito {get;set;}
        public bool principal {get;set;}
        public int Clienteid {get;set;}
        public bool Activo {get;set;}
    }
}