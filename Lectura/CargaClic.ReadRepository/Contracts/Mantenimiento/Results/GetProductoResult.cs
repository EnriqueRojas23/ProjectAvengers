namespace CargaClic.ReadRepository.Contracts.Mantenimiento.Results
{
    public class GetProductoResult
    {
        public System.Guid id	 {get;set;}
        public string Cliente {get;set;}
        public string Almacen {get;set;}
        public string Familia {get;set;}
        public string Codigo {get;set;}
        public string DescripcionLarga {get;set;}
        public decimal Peso {get;set;}
        public string UnidadMedida {get;set;}

    }
}