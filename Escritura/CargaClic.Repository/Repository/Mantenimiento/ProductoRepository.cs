using System;
using System.Linq;
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

        public int HuellaDetalleDelete(int HuellaDetalleId)
        {
            var huellaDetalle =   _context.HuellaDetalle.Where(x=>x.Id == HuellaDetalleId).SingleOrDefault();

            using(var transaction = _context.Database.BeginTransaction())
            {
                  try
                  {
                        _context.HuellaDetalle.Remove(huellaDetalle);
                        _context.SaveChanges();
                         transaction.Commit();
                  }
                  catch (System.Exception)
                  {
                      transaction.Rollback(); 
                      throw;
                  }
                  return huellaDetalle.Id;
            }
        }

        public async Task<int> HuellaDetalleRegister(HuellaDetalleForRegister huellaDetalleForRegister)
        {
            HuellaDetalle huellaDetalle = new HuellaDetalle();
            huellaDetalle.Grswgt = huellaDetalleForRegister.Grswgt;
            huellaDetalle.Height = huellaDetalleForRegister.Height;
            huellaDetalle.HuellaId = huellaDetalleForRegister.HuellaId;
            huellaDetalle.Length = huellaDetalleForRegister.Length;
            huellaDetalle.Netwgt = huellaDetalleForRegister.Netwgt;
            huellaDetalle.UnidadMedidaId = huellaDetalleForRegister.UnidadMedidaId;
            huellaDetalle.UntQty = huellaDetalleForRegister.UntQty;
            huellaDetalle.Width = huellaDetalleForRegister.Width;

            using(var transaction = _context.Database.BeginTransaction())
            {
                  try
                  {
                         await  _context.HuellaDetalle.AddAsync(huellaDetalle);
                         await _context.SaveChangesAsync();
                         transaction.Commit();
                  }
                  catch (System.Exception)
                  {
                      transaction.Rollback(); 
                      throw;
                  }
                  return huellaDetalle.Id;
                 
            }
        }

        public async Task<int> HuellaRegister(HuellaForRegister huellaRegister)
        {
            Huella huella = new Huella();
            huella.Caslvl = huellaRegister.Caslvl;
            huella.CodigoHuella = huellaRegister.CodigoHuella;
            huella.ProductoId = huellaRegister.ProductoId;
            huella.FechaRegistro = DateTime.Now;
            
            using(var transaction = _context.Database.BeginTransaction())
            {
                  try
                  {
                         await  _context.Huella.AddAsync(huella);
                         await _context.SaveChangesAsync();
                         transaction.Commit();
                  }
                  catch (System.Exception)
                  {
                      transaction.Rollback(); 
                      throw;
                  }
                  return huella.Id;
            }
        }

        public async Task<Guid> ProductRegister(ProductoForRegister productoForRegister)
        { 
             Producto producto = new Producto();
             producto.AlmacenId = 1;//productoForRegister.AlmacenId;
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