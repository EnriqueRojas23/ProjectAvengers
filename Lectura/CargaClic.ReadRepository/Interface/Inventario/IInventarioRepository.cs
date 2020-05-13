using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CargaClic.ReadRepository.Contracts.Inventario.Parameters;
using CargaClic.ReadRepository.Contracts.Inventario.Results;

namespace CargaClic.ReadRepository.Interface.Inventario
{
    public interface IInventarioReadRepository
    {
         Task<IEnumerable<GetAllInventarioResult>> GetAllInventario(GetAllInventarioParameters param);
         Task<IEnumerable<GetAllInventarioResult>> GetAllInventarioDetalle(long Id);
         Task<IEnumerable<GetAllInventarioResult>> GetPallet(Guid OrdenReciboId);

         Task<IEnumerable<GetGraficoStockResult>> GetGraficosStock(int PropietarioId, int AlmacenId);
         Task<IEnumerable<GetGraficoRecepcionResult>> GetGraficosRecepcion(int PropietarioId, int AlmacenId);

        




    }
}