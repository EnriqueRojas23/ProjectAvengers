using System;
using System.Threading.Tasks;
using CargaClic.Repository.Contracts.Mantenimiento;

namespace CargaClic.Repository.Interface.Mantenimiento
{
    public interface IProductoRepository
    {
        Task<Guid> ProductRegister(ProductoForRegister productoForRegister);
    } 
}