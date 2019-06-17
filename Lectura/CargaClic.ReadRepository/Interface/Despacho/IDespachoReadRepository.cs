using System.Collections.Generic;
using System.Threading.Tasks;
using CargaClic.Domain.Despacho;
using CargaClic.ReadRepository.Contracts.Despacho.Results;

namespace CargaClic.ReadRepository.Interface.Despacho
{
    public interface IDespachoReadRepository
    {
         Task<IEnumerable<GetAllOrdenSalidaDetalle>> GetAllOrdenSalidaDetalle(long OrdenSalidaId);
         Task<GetAllOrdenSalida> GetOrdenSalida(long OrdenSalidaId);
         Task<IEnumerable<GetAllOrdenSalida>> GetAllOrdenSalida(int PropietarioId, int EstadoId, int DaysAgo);
         Task<IEnumerable<GetAllCargas>> GetAllCargas(int PropietarioId, int EstadoId);
    }
}