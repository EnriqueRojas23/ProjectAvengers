namespace CargaClic.ReadRepository.Contracts.Mantenimiento.Results
{
    public class GetAllDireccionesResult
    {
        public int iddireccion	 { get;set;}
        public string codigo	 { get;set;}
        public string direccion	 { get;set;}
        public int iddistrito	 { get;set;}
        public string distrito	 { get;set;}
        public int idprovincia	 { get;set;}
        public string provincia	 { get;set;}
        public int iddepartamento	 { get;set;}
        public string departamento { get;set;}
    }

    public class GetAllDepartamentos
    {
        public int iddepartamento {get;set;}
        public string departamento {get;set;}
    }

    public class GetAllProvincias
    {
        public int idprovincia {get;set;}
        public string provincia {get;set;}
    }

    public class GetAllDistritos
    {
        public int iddistrito {get;set;}
        public string distrito {get;set;}
    }
}