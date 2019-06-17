using System;
using System.Threading.Tasks;
using CargaClic.Repository.Contracts.Mantenimiento;

namespace CargaClic.Repository.Interface.Mantenimiento
{
    public interface IProductoRepository
    {
        Task<Guid> ProductRegister(ProductoForRegister productoForRegister);
        Task<int> HuellaDetalleRegister(HuellaDetalleForRegister huellaDetalleForRegister);
        Task<int> HuellaRegister(HuellaForRegister huellaDetalleForRegister);
        int HuellaDetalleDelete(int HuellaDetalleId);
    } 
}