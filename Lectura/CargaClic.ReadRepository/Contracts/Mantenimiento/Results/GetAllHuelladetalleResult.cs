namespace CargaClic.ReadRepository.Contracts.Mantenimiento.Results
{
    public class GetAllHuelladetalleResult
    {
        public int Id	{get;set;}
        public int HuellaId	{get;set;}
        public decimal Height	{get;set;}
        public decimal Length	{get;set;}
        public decimal Width	{get;set;}
        public decimal Grswgt	{get;set;}
        public decimal Netwgt	{get;set;}
        public int UnidadMedidaId	{get;set;}
        public int UntQty	{get;set;}
        public string UnidadMedida{get;set;}

    }
}