using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using CargaClic.Common;
using CargaClic.Data;
using CargaClic.Domain.Mantenimiento;
using CargaClic.ReadRepository.Contracts.Mantenimiento.Results;


namespace CargaClic.ReadRepository.Interface.Mantenimiento
{
    public interface IMantenimientoRepository
    {
         Task<IEnumerable<GetAllHuelladetalleResult>> GetAllHuelladetalle(int HuellaId);
         Task<GetProductoResult> GetProducto(Guid ProductoId);
         

    }
}