using System;
using Common.QueryContracts;

namespace CargaClic.Contracts.Parameters.Prerecibo
{
    public class ObtenerOrdenReciboParameter : QueryParameter
    {
        public Guid Id { get; set; }
       
    }
}