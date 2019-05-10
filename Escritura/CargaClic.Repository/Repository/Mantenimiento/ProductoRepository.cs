using System;
using System.Threading.Tasks;
using CargaClic.Data;
using CargaClic.Domain.Mantenimiento;
using CargaClic.Repository.Contracts.Mantenimiento;
using CargaClic.Repository.Interface.Mantenimiento;
using Microsoft.Extensions.Configuration;

namespace CargaClic.Repository.Repository.Mantenimiento
{
    public class ProductoRepository : IProductoRepository
    {
        private readonly DataContext _context;
        private readonly IConfiguration _config;

        public ProductoRepository(DataContext context,IConfiguration config)
        {
            _context = context;
            _config = config;
        }
        public async Task<Guid> ProductRegister(ProductoForRegister productoForRegister)
        { 
             Producto producto = new Producto();
             producto.AlmacenId = productoForRegister.AlmacenId;
             producto.ClienteId = productoForRegister.ClienteId;
             producto.Codigo = productoForRegister.Codigo;
             producto.DescripcionLarga = productoForRegister.DescripcionLarga;
             producto.FamiliaId = productoForRegister.FamiliaId;
             producto.Peso = productoForRegister.Peso;
             producto.UnidadMedidaId = productoForRegister.UnidadMedidaId;
             
             
             
            using(var transaction = _context.Database.BeginTransaction())
            {
                  try
                  {
                         await  _context.Producto.AddAsync(producto);
                         await _context.SaveChangesAsync();
                         transaction.Commit();
                  }
                  catch (System.Exception)
                  {
                      transaction.Rollback(); 
                      throw;
                  }
                  return producto.Id;
                 
            }
        }
    }
}