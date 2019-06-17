
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using CargaClic.API.Dtos.Recepcion;
using CargaClic.Common;
using CargaClic.Data;
using CargaClic.Domain.Despacho;
using CargaClic.Domain.Inventario;
using CargaClic.Domain.Mantenimiento;
using CargaClic.Domain.Prerecibo;
using CargaClic.Repository.Contracts.Despacho;
using CargaClic.Repository.Interface;
using Dapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace CargaClic.Repository
{
    public class OrdenSalidaRepository : IOrdenSalidaRepository
    {
        private readonly DataContext _context;
        private readonly IConfiguration _config;

        public OrdenSalidaRepository(DataContext context,IConfiguration config)
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

        public async Task<long> matchTransporteCarga(long CargaId, long EquipoTransporteId)
        {
             using(var transaction = _context.Database.BeginTransaction())
            {
                var ordenDb = await _context.Carga.SingleOrDefaultAsync(x=>x.Id == CargaId);
                ordenDb.EquipoTransporteId = EquipoTransporteId;
                ordenDb.EstadoId = (int) Constantes.EstadoCarga.Pendiente;
                await _context.SaveChangesAsync();

                
                transaction.Commit();
               // transaction.Dispose();
                

                return CargaId;
            }
        }

        public async Task<long> RegisterCarga(CargaForRegister cargaForRegister)
        {
            cargaForRegister.ids = cargaForRegister.ids.Substring(1, cargaForRegister.ids.Length -1);
            string[] prm = cargaForRegister.ids.Split(',');
            Carga dominio  ;
            CargaDetalle cargasDetalle;
            OrdenSalida ordenSalida ;
            OrdenSalidaDetalle ordenSalidaDetalle;
            List<OrdenSalida> ordenesSalida ;
            
            List<OrdenSalidaDetalle> ordenesSalidaDetalle;
           


            using(var transaction = _context.Database.BeginTransaction())
            {

                ordenesSalidaDetalle = new List<OrdenSalidaDetalle>();     
                ordenesSalida = new List<OrdenSalida>();
                

                #region Obtener Listado de Ordenes

                // var parametros = new DynamicParameters();
                // parametros.Add("Id", dbType: DbType.Int64, direction: ParameterDirection.Input, value: Convert.ToInt64(prm[0]));
                // var result = new AuxOrden();

                // using (IDbConnection conn = Connection)
                // {
                //     var multiquery = await conn.QueryMultipleAsync
                //     (
                //         commandType: CommandType.StoredProcedure,
                //         sql: "Despacho.pa_obtener_ordensalida",
                //         param: parametros
                //     );

                //     result = multiquery.Read<AuxOrden>().LastOrDefault();
                //     if (result != null)
                //     {
                //         var detalleOrdenRecibo = multiquery.Read<AuxOrdenDetalle>().ToList();
                //         result.Detalles = detalleOrdenRecibo;
                //     }
                // }
                #endregion

                
                dominio = new Carga();
                dominio.EquipoTransporteId = null;
                dominio.EstadoId = (Int16)  Constantes.EstadoCarga.Pendiente;
                dominio.FechaConfirmacion = null;
                dominio.FechaRegistro = DateTime.Now;
                dominio.FechaSalida = null;
                dominio.ManifiestoId = null;
                dominio.NumCarga = "";
                dominio.Observacion = "";
                
                dominio.UsuarioAsignado = 1;
                dominio.UsuarioRegistro = 1;

                foreach (var item in prm)
                {
                    ordenSalida = await _context.OrdenSalida.Where(x=>x.Id == Convert.ToInt64(item)).SingleOrDefaultAsync();
                    dominio.PropietarioId = ordenSalida.PropietarioId;
                    dominio.ClienteId =  ordenSalida.ClienteId;
                    dominio.DireccionId = ordenSalida.DireccionId;
                    
                    ordenesSalida.Add(ordenSalida);
                    ordenesSalidaDetalle.AddRange(await _context.OrdenSalidaDetalle.Where(x=>x.OrdenSalidaId == ordenSalida.Id).ToListAsync());
     
                }
                try
                {
                     await _context.Carga.AddAsync(dominio);
                     await _context.SaveChangesAsync();
                     dominio.NumCarga = dominio.Id.ToString().PadLeft(7,'0');

                     ordenesSalida.ForEach(x=> {
                         x.CargaId = dominio.Id;
                         x.EstadoId = (Int16)  Constantes.EstadoOrdenSalida.Planificado;
                     });
                     
                     foreach (var item in ordenesSalidaDetalle)
                     {
                         cargasDetalle = new CargaDetalle();
                         cargasDetalle.EstadoId = (Int16)  Constantes.EstadoCarga.Pendiente;
                         cargasDetalle.HuellaId = item.HuellaId;
                         cargasDetalle.LineaId = item.Id;
                         cargasDetalle.Lote = item.Lote;
                         cargasDetalle.Metodo = "FIFO";
                         cargasDetalle.ProductoId = item.ProductoId;
                         cargasDetalle.UnidadMedidaId = item.UnidadMedidaId;
                         cargasDetalle.CargaId = dominio.Id;
                         cargasDetalle.Cantidad = item.Cantidad;
                         
                         await _context.CargaDetalle.AddAsync(cargasDetalle);
                     }

                     await _context.SaveChangesAsync();
                }
                catch (System.Exception)
                {
                    transaction.Rollback();
                    throw;
                }
                transaction.Commit();

              
            }
                 
                return dominio.Id;
        }

        public async Task<long> RegisterOrdenSalida(OrdenSalidaForRegister ordenSalidaForRegister)
        {

            OrdenSalida ordensalida  ;
            
            
            ordensalida = new OrdenSalida();
            ordensalida.Activo = true;
            ordensalida.AlmacenId = 1;
            ordensalida.EquipoTransporteId = null;
            ordensalida.EstadoId = (Int32) Constantes.EstadoOrdenSalida.Creado;
            ordensalida.FechaRegistro = DateTime.Now;
            ordensalida.FechaRequerida = Convert.ToDateTime(ordenSalidaForRegister.FechaRequerida);
            ordensalida.GuiaRemision = ordenSalidaForRegister.GuiaRemision;
            ordensalida.HoraRequerida = ordenSalidaForRegister.HoraRequerida;
            ordensalida.NumOrden = ordenSalidaForRegister.NumOrden;
            ordensalida.Propietario = ordenSalidaForRegister.Propietario;
            ordensalida.PropietarioId = ordenSalidaForRegister.PropietarioId;
            ordensalida.ClienteId = ordenSalidaForRegister.ClienteId;
            ordensalida.UbicacionId = null;
            ordensalida.UsuarioRegistro = 1;
            ordensalida.DireccionId = ordenSalidaForRegister.IdDireccion;
            ordensalida.NumOrden = "";
            ordensalida.OrdenCompraCliente = ordenSalidaForRegister.OrdenCompraCliente;


            using(var transaction = _context.Database.BeginTransaction())
            {
        

                await _context.OrdenSalida.AddAsync(ordensalida);
                await _context.SaveChangesAsync();

                ordensalida.NumOrden = (ordensalida.Id).ToString().PadLeft(7,'0');
                await _context.SaveChangesAsync();

                transaction.Commit();
                return ordensalida.Id;
            }
        }

        public async Task<long> RegisterOrdenSalidaDetalle(OrdenSalidaDetalleForRegister command)
        {
            OrdenSalidaDetalle dominio ;
            string linea = "";
            int cantidadTotal = 0;

            var detalles =  _context.OrdenSalidaDetalle.Where(x=>x.OrdenSalidaId == command.OrdenSalidaId);

            if(detalles.Count() == 0)
                linea = "0001";
            else {
                 linea = detalles.Max(x=>x.Linea).ToString();
                 linea = (Convert.ToInt32(linea) + 1).ToString().PadLeft(4,'0');
            }


           var huelladetalle = await _context.HuellaDetalle.SingleOrDefaultAsync(x=>x.HuellaId == command.HuellaId 
            && x.UnidadMedidaId == command.UnidadMedidaId);

           var huelladetalle_aux = await _context.HuellaDetalle.Where(x=>x.HuellaId == command.HuellaId).ToListAsync();



            if(huelladetalle.Pallet) // pallet 
            {
                cantidadTotal =   huelladetalle.UntQty  * command.Cantidad;
                command.Cantidad = cantidadTotal;
            }
            // else
            // {
            //     cantidadTotal = huelladetalle.UntQty * command.Cantidad;
            // }   


            dominio = new OrdenSalidaDetalle();
            dominio.Cantidad = command.Cantidad;
            dominio.Completo = command.Completo;
            dominio.EstadoID = command.EstadoID; 
            dominio.HuellaId = command.HuellaId;
            dominio.Linea = linea;
            dominio.Lote = command.Lote;
            dominio.OrdenSalidaId = command.OrdenSalidaId;
            dominio.ProductoId = command.ProductoId;
            dominio.UnidadMedidaId = command.UnidadMedidaId;

            
            using(var transaction = _context.Database.BeginTransaction())
            {
        

                await _context.OrdenSalidaDetalle.AddAsync(dominio);
                await _context.SaveChangesAsync();

                transaction.Commit();
                return dominio.Id;
            }


        }
    }
}