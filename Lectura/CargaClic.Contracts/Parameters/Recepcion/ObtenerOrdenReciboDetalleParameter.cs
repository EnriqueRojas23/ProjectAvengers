using System;
using Common.QueryContracts;

namespace CargaClic.Contracts.Parameters.Prerecibo
{
    public class ObtenerOrdenReciboDetalleParameter : QueryParameter
    {
        public long Id { get; set; }
       
    }
}