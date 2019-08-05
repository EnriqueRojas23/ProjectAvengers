using System.Collections.Generic;
using System.Threading.Tasks;
using CargaClic.Domain.Despacho;
using CargaClic.ReadRepository.Contracts.Despacho.Results;

namespace CargaClic.ReadRepository.Interface.Facturacion
{
    public interface IFacturacionReadRepository
    {
         Task<IEnumerable<GetPendientesLiquidacion>> GetPendientesLiquidacion(int ClienteId);
         Task<IEnumerable<GetLiquidaciones>> GetPreLiquidaciones(int ClienteId);
         Task<IEnumerable<GetLiquidaciones>> GetPreLiquidacion(int PreliquidacionId);
         

    }
}