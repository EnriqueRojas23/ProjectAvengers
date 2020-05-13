
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
             
            InvLod invLod = null;
            DateTime Fecha_out ;
            List<int> cajas  , pallets= new List<int>();
            
            int cantidad_pallets = 0, r = 0 ,  iteracion = 0 , UntQty = 0;
            decimal CasQty_Aux = 0;


            var huelladetalles = await _context.HuellaDetalle.Where(x=>x.HuellaId == command.HuellaId).ToListAsync();

            var pallet = huelladetalles.Where(x=>x.Pallet).Single();
            var cas = huelladetalles.Where(x=>x.Cas).SingleOrDefault();

            cantidad_pallets  =    command.untQty / pallet.UntQty ; // Cantidad de pallets


            #region Calculo de cantidad de paletas *** #palletunitarios ***
                if(cantidad_pallets > 0)
                { 
                    r=  command.untQty%pallet.UntQty; 
                    for (int i = 0; i < cantidad_pallets; i++)
                    {
                        pallets.Add(pallet.UntQty);
                    }
                    if(r > 0) 
                    pallets.Add(r);
                }
                else {
                    pallets.Add(command.untQty );
                }
            #endregion

 
            var linea = await _context.OrdenesReciboDetalle.SingleOrDefaultAsync(x=>x.Id == command.Id);
            var cab = await _context.OrdenesRecibo.SingleOrDefaultAsync(x=>x.Id ==  linea.OrdenReciboId);
            var ubicacion  = await _context.Ubicacion.Where(x=>x.Id ==cab.UbicacionId).SingleAsync();
             
             
             if(linea.CantidadRecibida == null)
                linea.CantidadRecibida  = 0;
             
            using(var transaction = _context.Database.BeginTransaction())
            {
                    try
                    {
                            foreach (var cantidadXpallet in pallets)
                            {
                                cajas = new List<int>();

                                if(cas != null)
                                {     
                                    CasQty_Aux =  Convert.ToDecimal(cantidadXpallet) / Convert.ToDecimal(cas.UntQty);
                                    iteracion   = Convert.ToInt32( Math.Floor(CasQty_Aux));

                                    r= cantidadXpallet%cas.UntQty; 

                                    for (int h = 0; h < iteracion; h++)
                                    {
                                        cajas.Add(cas.UntQty);
                                    }
                                    if(r > 0) {
                                        cajas.Add(r);
                                    }
                                }
                                else 
                                {
                                    cajas.Add(cantidadXpallet);
                                    iteracion   = 1;
                                }

                                invLod = new InvLod();
                                invLod.FechaHoraRegistro = DateTime.Now;
                                invLod.LodNum = "";
                                //En el origen, Stage de entrada.
                                invLod.UbicacionId = cab.UbicacionId.Value;
                                await _context.AddAsync<InvLod>(invLod);
                                await _context.SaveChangesAsync();

                                // Secuencia de LPN
                                invLod.LodNum =   'E' + (invLod.Id).ToString().PadLeft(8,'0');
                                    

                                    foreach (var item in cajas)
                                    {

                                        UntQty = item;

                                        dominio = new InventarioGeneral();
                                        //Vinculo INVLOD
                                        dominio.LodId = invLod.Id;
                                        dominio.FechaRegistro = DateTime.Now;
                                        dominio.HuellaId = command.HuellaId;
                                        dominio.LotNum = (command.LotNum == null?null:command.LotNum.Trim());
                                        dominio.ProductoId = linea.ProductoId;
                                        dominio.UsuarioIngreso = 1;
                                        dominio.LineaId = linea.Id;
                                        dominio.OrdenReciboId = linea.OrdenReciboId;
                                        dominio.EstadoId = command.EstadoID;

                                        if(cas != null)
                                        dominio.UntCas = cas.UntQty;
                                        else 
                                        dominio.UntCas = 1;

                                        dominio.Peso = command.Peso;
                                        dominio.Almacenado = false;
                                        linea.EstadoID = command.EstadoID;
                                        dominio.ClienteId = cab.PropietarioId;
                                        linea.Lote = command.LotNum;

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
                                            if(!DateTime.TryParse(command.FechaManufactura, out Fecha_out))
                                            throw new ArgumentException("Fecha de Manufactura incorrecta");
                                        else
                                            dominio.FechaManufactura = Convert.ToDateTime(command.FechaManufactura);

                                        #endregion


                                        linea.CantidadRecibida = linea.CantidadRecibida + UntQty;

                                        if(linea.Cantidad < linea.CantidadRecibida)
                                        throw new ArgumentException("err010");
                                        else if(linea.Cantidad == linea.CantidadRecibida)
                                        linea.Completo = true;
                                        dominio.UntQty = UntQty; //command.untQty;
                                        await _context.AddAsync<InventarioGeneral>(dominio);
                                    }
                         }
                          
                        cab.EstadoId =(Int16) Constantes.EstadoOrdenIngreso.PendienteAcomodo;
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
                
                return 2;

                
            
        }

        public async Task<Guid> closeDetails(Guid OrdenReciboId)
        {
            var cab = await _context.OrdenesRecibo.SingleOrDefaultAsync(x=>x.Id == OrdenReciboId);
            var detalles =  _context.OrdenesReciboDetalle.Where(x=>x.OrdenReciboId == OrdenReciboId);


            var Equipo =  _context.EquipoTransporte.SingleOrDefaultAsync(x=>x.Id ==  cab.EquipoTransporteId).Result;
            var ordenes = _context.OrdenesRecibo.Where(x=>x.EquipoTransporteId == Equipo.Id);
           
            cab.EstadoId  = (int)  Constantes.EstadoOrdenIngreso.PendienteAcomodo;

            using(var transaction = _context.Database.BeginTransaction())
            {
              
                    Equipo.EstadoId = (Int16)Constantes.EstadoEquipoTransporte.EnDescarga;
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

        public async Task<long> identifyDetailMix(IEnumerable<OrdenReciboDetalleForIdentifyDto> commanda)
        {

            var command = commanda.ToList();
            InventarioGeneral dominio = null;
            List<HuellaDetalle> huelladetalle = null;

            InvLod invLod = null;
            DateTime Fecha_out ;
            Decimal CasQty_Aux = 0;
            int iteracion = 0;
            int r;
            List<int> cantidad_almacenada = new List<int>();


            var cab = await _context.OrdenesRecibo.SingleOrDefaultAsync(x=>x.Id ==  command[0].OrdenReciboId);
            var ubicacion  = await _context.Ubicacion.Where(x=>x.Id ==cab.UbicacionId).SingleAsync();

            using(var transaction = _context.Database.BeginTransaction())
            {
                    try
                    {
                            invLod = new InvLod();
                            invLod.FechaHoraRegistro = DateTime.Now;
                            invLod.LodNum = "";
                            invLod.UbicacionId = cab.UbicacionId.Value;
                            await _context.AddAsync<InvLod>(invLod);
                            await _context.SaveChangesAsync();
                                // Secuencia de LPN
                            invLod.LodNum =   'E' + (invLod.Id).ToString().PadLeft(8,'0');

                            for (int i = 0; i < command.Count ; i++)
                            {

                                    cantidad_almacenada = new List<int>();

                                    var linea = 
                                    await _context.OrdenesReciboDetalle.SingleOrDefaultAsync(x=>x.Id == command[i].OrdenReciboDetalleId);


                                    huelladetalle = await _context.HuellaDetalle.Where(x=>x.HuellaId == command[i].HuellaId).ToListAsync();
                                    var huelladetalles = huelladetalle.OrderBy(x=>x.Id);
                                                                    
                                    
                                    if(linea.CantidadRecibida == null)
                                        linea.CantidadRecibida  = 0;

                                    if(linea.Cantidad < command[i].untQty) 
                                        throw new ArgumentException("Superó la cantidad de orden de recibo"); 
                                        
                                    if(linea.Cantidad < command[i].untQty + linea.CantidadRecibida)
                                       throw new ArgumentException("Superó la cantidad de orden de recibo"); 

                                     var cas = huelladetalles.Where(x=>x.Cas).SingleOrDefault();
                                     if(cas != null)
                                     {     
                                        CasQty_Aux = command[i].untQty / cas.UntQty;
                                        iteracion   = Convert.ToInt32( Math.Floor(CasQty_Aux));

                                        r= command[i].untQty%cas.UntQty; // 

                                        for (int h = 0; h < iteracion; h++)
                                        {
                                            cantidad_almacenada.Add(cas.UntQty);
                                        }
                                        if(r > 0) {
                                            var tot =   iteracion * cas.UntQty;
                                           cantidad_almacenada.Add( command[i].untQty - tot );
                                        }
                                         
                                     }
                                     else 
                                     {
                                          cantidad_almacenada.Add(command[i].untQty);
                                          iteracion   = 1;
                                     }
                                    foreach (var item in cantidad_almacenada)
                                    {

                                        dominio = new InventarioGeneral();
                                        dominio.LodId = invLod.Id;
                                        dominio.FechaRegistro = DateTime.Now;
                                        dominio.HuellaId = command[i].HuellaId;   
                                        dominio.LotNum = command[i].LotNum;
                                        dominio.ProductoId = command[i].ProductoId;
                                        dominio.UsuarioIngreso = 1;
                                        dominio.LineaId = command[i].OrdenReciboDetalleId;
                                        dominio.OrdenReciboId = command[i].OrdenReciboId;
                                        dominio.EstadoId = command[i].EstadoID;

                                        if(cas != null)
                                        dominio.UntCas = cas.UntQty;
                                        else 
                                        dominio.UntCas = 1;
                                        
                                        dominio.Peso =  command[i].Peso;
                                        dominio.Almacenado = false;
                                        linea.EstadoID = command[i].EstadoID;
                                        dominio.ClienteId = cab.PropietarioId;
                                        linea.Lote = command[i].LotNum;

                                        #region validar Fechas

                                        if(command[i].FechaExpire == "" || command[i].FechaExpire == null)
                                            dominio.FechaExpire= null;
                                        else
                                            if(!DateTime.TryParse(command[i].FechaExpire, out Fecha_out))
                                            throw new ArgumentException("Fecha de Expiración incorrecta");
                                        else
                                            dominio.FechaExpire = Convert.ToDateTime(command[i].FechaExpire);


                                        if(command[i].FechaManufactura == "" || command[i].FechaManufactura == null)
                                            dominio.FechaManufactura= null;
                                        else
                                            if(!DateTime.TryParse(command[i].FechaManufactura, out Fecha_out))
                                            throw new ArgumentException("Fecha de Manufactura incorrecta");
                                        else
                                            dominio.FechaManufactura = Convert.ToDateTime(command[i].FechaManufactura);

                                        #endregion
                                        
                                        linea.CantidadRecibida = linea.CantidadRecibida + item;

                                        if(linea.Cantidad < linea.CantidadRecibida)
                                            throw new ArgumentException("err010");
                                        else if(linea.Cantidad == linea.CantidadRecibida){
                                            linea.Completo = true;
                                            linea.CantidadRecibida = linea.Cantidad ;
                                        }
                                        dominio.UntQty = item;
                                        await _context.SaveChangesAsync();
                                        await _context.AddAsync<InventarioGeneral>(dominio);
                                    }
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
                
                return command.Count;

        }
    }
}