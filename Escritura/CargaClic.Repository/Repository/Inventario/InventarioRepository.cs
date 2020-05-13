
using System;
using System.Collections.Generic;
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

        public async Task<InventarioGeneral> ActualizarInventario(InventarioForEdit command)
        {
            InventarioGeneral dominio = null;
            AjusteInventario dominio_ajuste = new AjusteInventario();
            InvLod dominio_invlod = null;
            DateTime Fecha_out ;
 
            dominio =  _context.InventarioGeneral.SingleOrDefaultAsync(x => x.Id == command.Id).Result;
            dominio_invlod = _context.InvLod.SingleOrDefaultAsync(x=>x.Id == dominio.LodId).Result;


               #region validar Fechas

                    if(command.FechaExpire == "" || command.FechaExpire == null)
                        dominio.FechaExpire= null;
                    else
                    if(!DateTime.TryParse(command.FechaExpire, out Fecha_out))
                        throw new ArgumentException("Fecha de Expiración incorrecta");
                    else
                        dominio.FechaExpire = Convert.ToDateTime(command.FechaExpire);

               #endregion

                dominio_ajuste.Almacenado = dominio.Almacenado;
                dominio_ajuste.ClienteId  = dominio.ClienteId;
                dominio_ajuste.EstadoId = command.EstadoId;
                if(command.FechaExpire != null)
                dominio_ajuste.FechaExpire =  Convert.ToDateTime(command.FechaExpire);
                dominio_ajuste.FechaHoraAjuste = DateTime.Now;
                dominio_ajuste.FechaIngreso = dominio.FechaRegistro;
                if(command.FechaManufactura != null)
                dominio_ajuste.FechaManufactura = Convert.ToDateTime(command.FechaManufactura);
                dominio_ajuste.HuellaId = dominio.HuellaId;
                dominio_ajuste.InventarioId = dominio.Id;
                dominio_ajuste.LineaId = dominio.LineaId;
                dominio_ajuste.LodNum = dominio_invlod.LodNum;
                dominio_ajuste.LotNum  = command.LotNum;
                dominio_ajuste.OrdenReciboId = dominio.OrdenReciboId;
                dominio_ajuste.ProductoId = dominio.ProductoId;
                dominio_ajuste.UbicacionId = dominio_invlod.UbicacionId;
                dominio_ajuste.UntQty = command.UntQty;
                dominio_ajuste.UsuarioRegistroId = command.UsuarioActualizar;


                
                dominio.LotNum = command.LotNum;
                dominio.UntQty = command.UntQty;
                if(command.FechaExpire != null)
                dominio.FechaExpire = Convert.ToDateTime(command.FechaExpire);
                if(command.FechaManufactura != null)
                dominio.FechaManufactura = Convert.ToDateTime(command.FechaManufactura);
                dominio.EstadoId = command.EstadoId;


            using(var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    await _context.AddAsync<AjusteInventario>(dominio_ajuste);
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
        

        public async Task<long> Almacenamiento(InventarioForStorage command)
        {
            var invlod  = await _context.InvLod.Where(x=>x.Id == command.Id).SingleOrDefaultAsync();

            var dominios = await _context.InventarioGeneral.Where(x=>x.LodId == invlod.Id).ToListAsync();
          
           

            var lineas =  _context.OrdenesReciboDetalle.Where(x=>x.OrdenReciboId == dominios[0].OrdenReciboId).ToList();
            var cab = _context.OrdenesRecibo.Where(x=>x.Id == dominios[0].OrdenReciboId).Single();
            var Equipo = _context.EquipoTransporte.Where(x=>x.Id == cab.EquipoTransporteId).Single();
            var pendientes = _context.OrdenesRecibo.Where(x=>x.EquipoTransporteId == Equipo.Id).ToList();
            

         
            KardexGeneral nuevo  ;

            using(var transaction = _context.Database.BeginTransaction())
            {
               
                try
                {
                    invlod.UbicacionId =   invlod.UbicacionProxId.Value;
                    invlod.UbicacionProxId = null;
                    
                    foreach (var dominio in dominios)
                    {
                        
                        dominio.Almacenado = true;

                        nuevo = new KardexGeneral();
                        nuevo.Almacenado = true;
                        nuevo.EstadoId = dominio.EstadoId;
                        nuevo.FechaExpire = dominio.FechaExpire;
                        nuevo.FechaManufactura = dominio.FechaManufactura;
                        nuevo.FechaRegistro = dominio.FechaRegistro;
                        nuevo.HuellaId = dominio.HuellaId;
                        nuevo.LineaId = dominio.LineaId;
                        nuevo.LodId = dominio.LodId;
                        nuevo.LotNum = dominio.LotNum;
                        nuevo.UntCas = dominio.UntCas;
                        nuevo.Movimiento = "E";
                        nuevo.OrdenReciboId = dominio.OrdenReciboId;
                        nuevo.Peso = dominio.Peso;
                        nuevo.ProductoId = dominio.ProductoId;
                        nuevo.PropietarioId = dominio.ClienteId;
                        nuevo.ShipmentLine = null;
                        nuevo.UntQty = dominio.UntQty;
                        nuevo.UsuarioIngreso = 1;
                        nuevo.InventarioId = dominio.Id;
                        /// La fecha de registro es identica a la fecha esperada de la Orden de Recibo/////
                        nuevo.FechaIngreso = cab.FechaEsperada;
                        ////////////////////////////////////////////
                        _context.KardexGeneral.Add(nuevo);
               
                       }
                        await _context.SaveChangesAsync();
                      //  lineas =  _context.InventarioGeneral.Where(x=>x.OrdenReciboId == dominios[0].OrdenReciboId).ToList();   
                        foreach (var item in lineas)
                        {
                            if(!item.Completo){
                                cab.EstadoId = (Int16) Constantes.EstadoOrdenIngreso.PendienteAcomodo;  
                                Equipo.EstadoId = (Int16) Constantes.EstadoEquipoTransporte.EnDescarga;
                            }
                            else {
                                cab.EstadoId = (Int16) Constantes.EstadoOrdenIngreso.Almacenado;  
                                var no = pendientes.Where(x=>x.EstadoId != 12).ToList();
                                if(no.Count == 0)
                                {
                                    Equipo.EstadoId = (Int16) Constantes.EstadoEquipoTransporte.Cerrado;
                                }
                            }
                           
                        }

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

        public async Task<long> AssignarUbicacion(IEnumerable<InventarioForAssingment> commands)
        {
            string query = "";
            Ubicacion dominio_ubicacion = null;
            string ids = "";
            int UbicacionId = 0;
            
        using(var transaction = _context.Database.BeginTransaction())
        {

            try
            {
                var group =  commands.ToList().GroupBy(x=>x.UbicacionId);
                foreach (var command in group)
                {
                    ids = "";
                    command.ToList().ForEach( x=> {
                        ids = ids +  x.lodId.ToString() + ",";
                        UbicacionId = x.UbicacionId;
                    });

                    ids  = ids.Substring(0,ids.Length - 1);
                    dominio_ubicacion = await _context.Ubicacion.SingleOrDefaultAsync(x=>x.Id == UbicacionId);
            
                    //Ver nivel de ocupabilidad;
                        query = string.Format("update inventario.invlod"
                    + " set UbicacionProxId = {0} "
                    + " where id in ({1}) Select * from inventario.invlod where id in ({1}) " ,
                                UbicacionId.ToString(), ids);
    
                                                
                    var resp =   _context.InvLod
                                .FromSql(query)
                                .ToList();

                                dominio_ubicacion.EstadoId = 17;     //Parcial
                                await _context.SaveChangesAsync();
                                
                          
                           
                 }
                 transaction.Commit();
            }
            catch (Exception ex)
            {
                transaction.Rollback();  
                throw ex; 
            }
                   return UbicacionId;
            
  
            
            }
             //return dominio.Id;
        }
        public async Task<Guid> FinalizarRecibo(InventarioForFinishRecive command)
        {
            OrdenRecibo dominio = null;
            dominio =  _context.OrdenesRecibo.SingleOrDefaultAsync(x => x.Id == command.OrdenReciboId).Result;
            dominio.EstadoId =(int) Constantes.EstadoOrdenIngreso.PendienteAlmacenamiento;


             var inventarios = _context.InventarioGeneral.Where(x=>x.OrdenReciboId == command.OrdenReciboId).ToList();
            //  foreach (var item in inventarios)
            //  {
                               
            //     //  if(item.UbicacionIdProx == null)
            //     //     throw new ArgumentException("Err101");
            // } 

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

        public async Task<long> MergeInventario(MergeInventarioRegister mergeInventarioRegister)
        {
            string[] prm = mergeInventarioRegister.ids.Split(',');
            InventarioGeneral dominio = new InventarioGeneral();
            InvLod invLod = null;
            List<AjusteInventario> ajustes = new List<AjusteInventario>();
            




             var aux = _context.InventarioGeneral.Where(x=>x.Id == Convert.ToInt64(prm[1])).SingleOrDefault();
             var lod = _context.InvLod.Where(x=>x.Id == aux.LodId).SingleOrDefault();
             
           
            //dominio.UntQty = total;

            using(var transaction = _context.Database.BeginTransaction())
            {

                try
                {

                        invLod = new InvLod();
                        invLod.FechaHoraRegistro = DateTime.Now;
                        invLod.LodNum = "";
                        invLod.UbicacionId = lod.UbicacionId;

                        await _context.AddAsync<InvLod>(invLod);
                        await _context.SaveChangesAsync();

                        // Secuencia de LPN
                        invLod.LodNum =   'E' + (invLod.Id).ToString().PadLeft(8,'0');

                        foreach (var item in prm)
                        {
                            var inventarios = _context.InventarioGeneral.Where(x=>x.LodId == Convert.ToInt64(item)).ToList();
                            foreach (var item2 in inventarios)
                            {
                                //Vinculo INVLOD
                                item2.LodId = invLod.Id;
                                _context.SaveChanges();
                            }
                         
                        }

                       




                     //agregar a ajustes
                    await _context.AddRangeAsync(ajustes);
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

        public async Task<long> RegistrarAjuste(AjusteForRegister ajusteForRegister)
        {
           AjusteInventario dominio = null;

           dominio.EstadoId = ajusteForRegister.EstadoId;
           dominio.FechaExpire= ajusteForRegister.FechaExpire;
           dominio.FechaHoraAjuste = ajusteForRegister.FechaHoraAjuste;
           dominio.FechaIngreso = ajusteForRegister.FechaIngreso;
           dominio.FechaManufactura = ajusteForRegister.FechaManufactura;
           dominio.InventarioId = ajusteForRegister.InventarioId;
           dominio.LodNum = ajusteForRegister.LodNum;
           dominio.LotNum = ajusteForRegister.LotNum;
           dominio.UbicacionId = ajusteForRegister.UbicacionId;
           dominio.UntQty = ajusteForRegister.UntQty;

           using(var transaction = _context.Database.BeginTransaction())
            {

                try
                {
                    await _context.AddAsync<AjusteInventario>(dominio);
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
                dominio.UntCas = command.UntCas;
                dominio.UntPak = command.UntPak;
                dominio.UntQty = command.UntQty;
                dominio.UsuarioIngreso = command.UsuarioIngreso;
                dominio.ClienteId = command.ClienteId;
                dominio.Almacenado = false;


            using(var transaction = _context.Database.BeginTransaction())
            {

                try
                {
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