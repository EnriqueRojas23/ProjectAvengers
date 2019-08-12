
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using CargaClic.API.Dtos.Recepcion;
using CargaClic.Common;
using CargaClic.Data;
using CargaClic.Domain.Inventario;
using CargaClic.Domain.Mantenimiento;
using CargaClic.Domain.Prerecibo;
using CargaClic.Repository.Interface;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace CargaClic.Repository
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

                var max = await _context.EquipoTransporte.MaxAsync(x=>x.Codigo);
                if(max==null) max = "EQ00000001";
                max  = "EQ" + (Convert.ToInt64(max.Substring(2,8)) + 1).ToString().PadLeft(8,'0');
                eq.Codigo = max;

                eq.FechaRegistro = DateTime.Now;
                eq.PropietarioId = eq.PropietarioId; 

                  // var userDb = await _context.EquipoTransporte.SingleOrDefaultAsync(x=>x.Id == user.Id);
                await _context.AddAsync<EquipoTransporte>(eq);
                await _context.SaveChangesAsync();
                  // var ordenDb = await _context.OrdenesRecibo.SingleOrDefaultAsync(x=>x.Id == OrdenReciboId);
                  // ordenDb.EquipoTransporteId = eq.Id;
                  // await _context.SaveChangesAsync();
                transaction.Commit();
                  // transaction.Dispose();
                

                return eq;
            }
        }

        public async Task<EquipoTransporte> assignmentOfDoor(long EquipoTransporteId, int UbicacionId)
        {
            using(var transaction = _context.Database.BeginTransaction())
            {
               
                var equipoTransporteBd = await _context.EquipoTransporte.SingleOrDefaultAsync(x=>x.Id == EquipoTransporteId);
                equipoTransporteBd.EstadoId = (int) Constantes.EstadoEquipoTransporte.Asignado;
                equipoTransporteBd.PuertaId = UbicacionId;
                await _context.SaveChangesAsync();

                var ordenesBd = await _context.OrdenesRecibo.Where(x=>x.EquipoTransporteId == EquipoTransporteId).ToListAsync();
                foreach (var item in ordenesBd)
                {
                   item.EstadoId = (int) Constantes.EstadoOrdenIngreso.Asignado;
                   item.UbicacionId = UbicacionId;
                   await _context.SaveChangesAsync();
                }

            

                var ubicacionDb = await _context.Ubicacion.SingleOrDefaultAsync(x=>x.Id == UbicacionId);
                ubicacionDb.EstadoId =  9; //Lleno
                await _context.SaveChangesAsync();

                
                transaction.Commit();
                //transaction.Dispose();
                

                return equipoTransporteBd;
            }
        }

        public async Task<long> identifyDetail(OrdenReciboDetalleForIdentifyDto command)
        {
             InventarioGeneral dominio = null;
             
             //Agrupación...
             InvLod invLod = null;


             DateTime Fecha_out ;

            var huelladetalle = await _context.HuellaDetalle.SingleOrDefaultAsync(x=>x.HuellaId == command.HuellaId 
            && x.UnidadMedidaId == command.UnidadMedidaId);

            var huelladetalle_aux = await _context.HuellaDetalle.Where(x=>x.HuellaId == command.HuellaId).ToListAsync();

            int interacciones = 0;
            int cantidadTotal = 0;


            if(huelladetalle.Pallet) // pallet 
            {
                cantidadTotal =   huelladetalle.UntQty  * command.CantidadRecibida;
                interacciones  =    cantidadTotal / huelladetalle.UntQty ;
                command.CantidadRecibida = huelladetalle.UntQty;
            }
            else
            {
                cantidadTotal = huelladetalle.UntQty * command.CantidadRecibida;
                interacciones = 1;
            }   
            var linea = await _context.OrdenesReciboDetalle.SingleOrDefaultAsync(x=>x.Id == command.Id);
            var cab = await _context.OrdenesRecibo.SingleOrDefaultAsync(x=>x.Id ==  linea.OrdenReciboId);
            var ubicacion  = await _context.Ubicacion.Where(x=>x.Id ==cab.UbicacionId).SingleAsync();
             
             
             if(linea.CantidadRecibida == null)
               linea.CantidadRecibida  = 0;

            using(var transaction = _context.Database.BeginTransaction())
            {
                    try
                    {

                            for (int i = 0; i < interacciones ; i++)
                            {

                                    
                                    invLod = new InvLod();
                                    invLod.FechaHoraRegistro = DateTime.Now;
                                    invLod.LodNum = "";
                                    //En el origen, Stage de entrada.
                                    invLod.UbicacionId = cab.UbicacionId.Value;
                                    await _context.AddAsync<InvLod>(invLod);
                                    await _context.SaveChangesAsync();

                                    // Secuencia de LPN
                                    invLod.LodNum =   'E' + (invLod.Id).ToString().PadLeft(8,'0');
                                    
                                    dominio = new InventarioGeneral();
                                    //Vinculo INVLOD
                                    dominio.LodId = invLod.Id;
                                    dominio.FechaRegistro = DateTime.Now;
                                    dominio.HuellaId = huelladetalle_aux.Where(x=>x.Cas == true).SingleOrDefault().Id;    //command.HuellaId;
                                    dominio.LotNum = (command.Lote == null?null:command.Lote.Trim());
                                    dominio.ProductoId = linea.ProductoId;
                                    dominio.UsuarioIngreso = 1;
                                    dominio.LineaId = linea.Id;
                                    dominio.OrdenReciboId = linea.OrdenReciboId;
                                    dominio.EstadoId = command.EstadoID;
                                    dominio.UntCas = huelladetalle_aux.Where(x=>x.Cas == true).SingleOrDefault().UntQty; 
                                    dominio.Peso = command.Peso;
                                    linea.EstadoID = command.EstadoID;
                                    dominio.ClienteId = cab.PropietarioId;
                                    linea.Lote = command.Lote;

                                    #region validar Fechas

                                    if(command.FechaExpire == "" || command.FechaExpire == null)
                                         dominio.FechaExpire= null;
                                    else
                                        if(!DateTime.TryParse(command.FechaExpire, out Fecha_out))
                                         throw new ArgumentException("Fecha de Expiración incorrecta");
                                    else
                                        dominio.FechaExpire = Convert.ToDateTime(command.FechaExpire);


                                    if(command.FechaManufactura == "" || command.FechaManufactura == null)
                                        dominio.FechaManufactura= null;
                                    else
                                        if(!DateTime.TryParse(command.FechaExpire, out Fecha_out))
                                         throw new ArgumentException("Fecha de Expiración incorrecta");
                                    else
                                        dominio.FechaManufactura = Convert.ToDateTime(command.FechaManufactura);

                                    #endregion


                                    linea.CantidadRecibida = linea.CantidadRecibida + command.CantidadRecibida;

                                    if(linea.Cantidad < linea.CantidadRecibida)
                                    throw new ArgumentException("err010");
                                    else if(linea.Cantidad == linea.CantidadRecibida)
                                    linea.Completo = true;
                                    dominio.UntQty = command.CantidadRecibida;
                                    await _context.AddAsync<InventarioGeneral>(dominio);
                            }
                            cab.EstadoId =(Int16) Constantes.EstadoOrdenIngreso.Recibiendo;
                            ubicacion.EstadoId = 10; // Libre
                            await _context.SaveChangesAsync();
                          
                             


                            transaction.Commit();
                            
                        
                    }
                    catch (Exception ex)
                    {
                        transaction.Rollback();  
                        throw ex; 
                    }
                    finally
                   {
                        transaction.Dispose();
                    }
                }
                
                return interacciones;

                
            
        }

        public async Task<Guid> closeDetails(Guid OrdenReciboId)
        {
            var cab = await _context.OrdenesRecibo.SingleOrDefaultAsync(x=>x.Id == OrdenReciboId);
            var detalles =  _context.OrdenesReciboDetalle.Where(x=>x.OrdenReciboId == OrdenReciboId);


            var Equipo =  _context.EquipoTransporte.SingleOrDefaultAsync(x=>x.Id ==  cab.EquipoTransporteId).Result;
            var ordenes = _context.OrdenesRecibo.Where(x=>x.EquipoTransporteId == Equipo.Id);
            
            var pendientes = ordenes.Where(x=>x.EstadoId  == (int)Constantes.EstadoOrdenIngreso.PendienteAcomodo).ToList();
            



            IQueryable<InventarioGeneral> list = null;
           
            cab.EstadoId  = (int)  Constantes.EstadoOrdenIngreso.Terminado;

            using(var transaction = _context.Database.BeginTransaction())
            {
                    // if(pendientes.Count == 0){
                    //     Equipo.EstadoId = (Int16)Constantes.EstadoEquipoTransporte.Cerrado ;
                    // }
                    //else {
                    Equipo.EstadoId = (Int16)Constantes.EstadoEquipoTransporte.EnDescarga;
                    //}
                    foreach (var item in detalles)
                    {
                        list =   _context.InventarioGeneral.Where(x=>x.LineaId == item.Id);
                        foreach (var item1 in list)
                        {
                             //item1.UbicacionId = cab.UbicacionId.Value ;
                        }
                    }
                    cab.EstadoId = (Int16) Constantes.EstadoOrdenIngreso.PendienteAcomodo;
                    await _context.SaveChangesAsync();
                    transaction.Commit();
                    return OrdenReciboId;
            }
        }

        public async Task<Guid> matchTransporteOrdenIngreso(EquipoTransporteForRegisterDto eq)
        {
            using(var transaction = _context.Database.BeginTransaction())
            {
            

                var ordenDb = await _context.OrdenesRecibo.SingleOrDefaultAsync(x=>x.Id == eq.OrdenReciboId);
                ordenDb.EquipoTransporteId = eq.Id;
                ordenDb.EstadoId = (int) Constantes.EstadoOrdenIngreso.Asignado;
                await _context.SaveChangesAsync();

                
                transaction.Commit();
               // transaction.Dispose();
                

                return eq.OrdenReciboId;
            }
        }
    }
}