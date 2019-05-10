
using System;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using CargaClic.Common;
using CargaClic.Data;
using CargaClic.Domain.Inventario;
using CargaClic.Domain.Mantenimiento;
using CargaClic.Domain.Prerecibo;
using CargaClic.Repository.Contracts.Inventario;
using CargaClic.Repository.Interface;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace CargaClic.Repository
{
    public class InventarioRepository : IInventarioRepository
    {
        private readonly DataContext _context;
        private readonly IConfiguration _config;

        public InventarioRepository(DataContext context,IConfiguration config)
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

        public async Task<long> Almacenamiento(InventarioForStorage command)
        {

            var dominio   = _context.InventarioGeneral.Where(x=>x.Id == command.Id).SingleOrDefaultAsync().Result;
            dominio.UbicacionId = dominio.UbicacionIdProx;                    
            dominio.UbicacionIdProx = null;
            dominio.Almacenado = true;

            var lineas =  _context.InventarioGeneral.Where(x=>x.OrdenReciboId == dominio.OrdenReciboId).ToList();
            var cab = _context.OrdenesRecibo.Where(x=>x.Id == dominio.OrdenReciboId).Single();
            var Equipo = _context.EquipoTransporte.Where(x=>x.Id == cab.EquipoTransporteId).Single();

            foreach (var item in lineas)
            {
                if(item.Almacenado.HasValue){
                    if(!item.Almacenado.Value){
                        cab.EstadoId = (Int16) Constantes.EstadoOrdenIngreso.PendienteAlmacenamiento;  
                        break;  
                    }
                    else {
                       cab.EstadoId = (Int16) Constantes.EstadoOrdenIngreso.Terminado;  
                       Equipo.EstadoId = (Int16) Constantes.EstadoEquipoTransporte.Cerrado;
                    }
                }
                else {
                       cab.EstadoId = (Int16) Constantes.EstadoOrdenIngreso.PendienteAlmacenamiento;
                       break;  
                }
            }
        

            using(var transaction = _context.Database.BeginTransaction())
            {
               
                try
                {
                        await _context.SaveChangesAsync();
                        transaction.Commit();
                }
                catch (Exception ex)
                    {
                        transaction.Rollback();  
                        throw ex; 
                    }
                return command.Id;
            }

            
        }

        public async Task<long> AssignarUbicacion(InventarioForAssingment command)
        {
            string query = "";
            InventarioGeneral dominio = null;
            Ubicacion dominio_ubicacion = null;
            Ubicacion dominio_ubicacionanterior = null;

            dominio_ubicacion = await _context.Ubicacion.SingleOrDefaultAsync(x=>x.Id == command.UbicacionId);
      


            if(command.Id.Split(',').Length > 0)
            {
                 using(var transaction = _context.Database.BeginTransaction())
                 {
               
             
                        //Ver nivel de ocupabilidad;
                            query = string.Format("update inventario.inventariogeneral"
                        + " set UbicacionIdProx = '{0}' "
                        + " where id in ({1}) Select * from inventario.inventariogeneral where id in ({1}) " ,
                                    command.UbicacionId.ToString(), command.Id);
        
                try
                {
                                    
                    var resp =   _context.InventarioGeneral
                                .FromSql(query)
                                .ToList();

                    dominio_ubicacion.EstadoId = 17;     //Parcial
                    await _context.SaveChangesAsync();
                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();  
                    throw ex; 
                }
                return command.UbicacionId;
            }
            }
            else
            {
                dominio = await  _context.InventarioGeneral.SingleOrDefaultAsync(x => x.Id == Convert.ToInt64(command.Id));
                if(dominio.UbicacionIdProx != null)    
                {
                    dominio_ubicacionanterior =  await _context.Ubicacion.SingleOrDefaultAsync(x=>x.Id == dominio.UbicacionIdProx);
                    dominio_ubicacionanterior.EstadoId = 10;// Liberarlo
                }
                using(var transaction = _context.Database.BeginTransaction())
                {
                    dominio_ubicacion.EstadoId = 11;     //Separarlo
                    dominio.UbicacionIdProx = command.UbicacionId;
                try
                {
                    await _context.SaveChangesAsync();
                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();  
                    throw ex; 
                }
                return dominio.Id;
            }

            }

            

     
           


           
           

           
               
        }

        public async Task<Guid> FinalizarRecibo(InventarioForFinishRecive command)
        {
            OrdenRecibo dominio = null;
            dominio =  _context.OrdenesRecibo.SingleOrDefaultAsync(x => x.Id == command.OrdenReciboId).Result;
            dominio.EstadoId =(int) Constantes.EstadoOrdenIngreso.PendienteAlmacenamiento;


             var inventarios = _context.InventarioGeneral.Where(x=>x.OrdenReciboId == command.OrdenReciboId).ToList();
             foreach (var item in inventarios)
             {
                               
                 if(item.UbicacionIdProx == null)
                    throw new ArgumentException("Err101");
            } 

            using(var transaction = _context.Database.BeginTransaction())
            {
               
                try
                {
                        await _context.SaveChangesAsync();
                        transaction.Commit();
                }
                catch (Exception ex)
                    {
                        transaction.Rollback();  
                        throw ex; 
                    }
                return command.OrdenReciboId;
            }

            
        }

        public async Task<InventarioGeneral> RegistrarInventario(InventarioForRegister command)
        {
            InventarioGeneral dominio = null;
            DateTime Fecha_out ;
            

             if (command.Id.HasValue)
                dominio =  _context.InventarioGeneral.SingleOrDefaultAsync(x => x.Id == command.Id).Result;
             else
                dominio = new InventarioGeneral();


                #region validar Fechas

                    if(command.FechaExpire == "" || command.FechaExpire == null)
                        dominio.FechaExpire= null;
                    else
                    if(!DateTime.TryParse(command.FechaExpire, out Fecha_out))
                        throw new ArgumentException("Fecha de Expiración incorrecta");
                    else
                        dominio.FechaExpire = Convert.ToDateTime(command.FechaExpire);

               #endregion

          

                
                dominio.FechaRegistro = DateTime.Now;
                dominio.HuellaId = command.HuellaId;
                dominio.LotNum = command.LotNum;
                dominio.ProductoId = command.ProductoId;
                dominio.UbicacionId = command.UbicacionId;
                dominio.UbicacionIdUlt = command.UbicacionIdUlt;
                dominio.UntCas = command.UntCas;
                dominio.UntPak = command.UntPak;
                dominio.UntQty = command.UntQty;
                dominio.UsuarioIngreso = command.UsuarioIngreso;
                dominio.ClienteId = command.ClienteId;


            using(var transaction = _context.Database.BeginTransaction())
            {

                try
                {
                    var max = await _context.InventarioGeneral.MaxAsync(x=>x.LodNum);
                    if(max==null) max = "E00000001";
                    max  = 'E' + (Convert.ToInt64(max.Substring(1,8)) + 1).ToString().PadLeft(8,'0');
                    dominio.LodNum = max;
                    
                    await _context.AddAsync<InventarioGeneral>(dominio);
                    await _context.SaveChangesAsync();
                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();  
                    throw ex; 
                }
                return dominio;
            }
        }
    }
}