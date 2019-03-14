
using System;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;
using CargaClic.Data;
using CargaClic.Domain.Mantenimiento;
using CargaClic.Domain.Prerecibo;
using CargaClic.Repository.Interface;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace CargaClic.Repository.Repository
{
    public class OrdenReciboRepository : IOrdenReciboRepository
    {
        private readonly DataContext _context;
        private readonly IConfiguration _config;

        public OrdenReciboRepository(DataContext context,IConfiguration config)
        {
            _context = context;
            _config = config;
        }
        public IDbConnection Connection
        {   
            get
            {
                var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
                try
                {
                     connection.Open();
                     return connection;
                }
                catch (System.Exception)
                {
                    connection.Close();
                    connection.Dispose();
                    throw;
                }
            }
        }
        public async Task<EquipoTransporte> RegisterEquipoTransporte(EquipoTransporte eq, Guid OrdenReciboId)
        {
            using(var transaction = _context.Database.BeginTransaction())
            {
               
               // var userDb = await _context.EquipoTransporte.SingleOrDefaultAsync(x=>x.Id == user.Id);
                await _context.AddAsync<EquipoTransporte>(eq);
                await _context.SaveChangesAsync();
            

                var ordenDb = await _context.OrdenesRecibo.SingleOrDefaultAsync(x=>x.Id == OrdenReciboId);
                ordenDb.EquipoTransporteId = eq.Id;
                await _context.SaveChangesAsync();

                
                transaction.Commit();
               // transaction.Dispose();
                

                return eq;
            }
        }

        public async Task<OrdenRecibo> assignmentOfDoor(Guid OrdenReciboId, int UbicacionId)
        {
             using(var transaction = _context.Database.BeginTransaction())
            {
               
                var ordenReciboDb = await _context.OrdenesRecibo.SingleOrDefaultAsync(x=>x.Id == OrdenReciboId);
                //ordenReciboDb.EstadoId = 
                ordenReciboDb.UbicacionId = UbicacionId;
                await _context.SaveChangesAsync();
            

                var ubicacionDb = await _context.Ubicacion.SingleOrDefaultAsync(x=>x.Id == UbicacionId);
                ubicacionDb.EstadoId =  9; //Lleno
                await _context.SaveChangesAsync();

                
                transaction.Commit();
                //transaction.Dispose();
                

                return ordenReciboDb;
            }
        }
    }
}