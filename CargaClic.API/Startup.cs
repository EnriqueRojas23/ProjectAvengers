using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using CargaClic.Data;
using CargaClic.API.Helpers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using CargaClic.API.Data;
using CargaClic.Handlers;
using CargaClic.Handlers.Seguridad;
using Common.QueryHandlers;
using CargaClic.Data.Contracts.Parameters.Seguridad;
using CargaClic.Data.Interface;
using CargaClic.Domain.Seguridad;
using Common;
using CargaClic.Contracts.Parameters.Prerecibo;
using CargaClic.Handlers.Precibo;
using CargaClic.Domain.Mantenimiento;
using CargaClic.Domain.Prerecibo;
using CargaClic.Contracts.Parameters.Mantenimiento;
using CargaClic.Handlers.Mantenimiento;
using CargaClic.Repository.Interface;

using CargaClic.Repository;
using CargaClic.Contracts.Parameters.Inventario;
using CargaClic.Handlers.Inventario;
using CargaClic.Domain.Inventario;
using CargaClic.Repository.Interface.Mantenimiento;
using CargaClic.Repository.Repository.Mantenimiento;
using CargaClic.ReadRepository.Interface.Mantenimiento;

namespace CargaClic.API
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
             services.AddDbContext<DataContext>(x=>x.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
             services.AddSingleton(_ => Configuration);
             services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
             services.AddCors();
             services.AddAutoMapper();
             services.AddTransient<Seed>();
             //services.AddTransient<Seed>();

             services.AddScoped<IRepository<User>,Repository<User>>();
             services.AddScoped<IRepository<Rol>,Repository<Rol>>();
             services.AddScoped<IRepository<RolPagina>,Repository<RolPagina>>();
             services.AddScoped<IRepository<Pagina>,Repository<Pagina>>();
             services.AddScoped<IRepository<RolUser>,Repository<RolUser>>();
             services.AddScoped<IRepository<Estado>,Repository<Estado>>();

             

             services.AddScoped<IMantenimientoRepository,MantenimientoRepository>();
             services.AddScoped<IAuthRepository,AuthRepository>();
             services.AddScoped<IQueryHandler<ListarUsuariosParameters>,ListarUsuariosQuery>();
             services.AddScoped<IQueryHandler<ListarMenusxRolParameter>,ListarMenusxRolQuery>();
             services.AddScoped<IQueryHandler<ListarTreeViewParameter>,ListarTreeViewQuery>();
             services.AddScoped<IQueryHandler<ListarRolesPorUsuarioParameter>,ListarRolesPorUsuarioQuery>();


            services.AddScoped<IRepository<Cliente>, Repository<Cliente>>();
            services.AddScoped<IRepository<Proveedor>, Repository<Proveedor>>();
            services.AddScoped<IRepository<Vehiculo>, Repository<Vehiculo>>();
            services.AddScoped<IRepository<Huella>, Repository<Huella>>();
            services.AddScoped<IRepository<Chofer>, Repository<Chofer>>();
            services.AddScoped<IRepository<ValorTabla>, Repository<ValorTabla>>();
            services.AddScoped<IProductoRepository, ProductoRepository>();


            services.AddScoped<IQueryHandler<ListarProductosParameter>,ListarProductosQuery>();
            services.AddScoped<IQueryHandler<ListarPlacasParameter>,ListarPlacasQuery>();
            services.AddScoped<IQueryHandler<ListarProveedorParameter>,ListarProveedorQuery>();
            services.AddScoped<IQueryHandler<ObtenerEquipoTransporteParameter>,ObtenerEquipoTransporteQuery>();
            services.AddScoped<IQueryHandler<ListarEquipoTransporteParameter>,ListarEquipoTransporteQuery>();



            services.AddScoped<IInventarioRepository,InventarioRepository>();
            
            
            services.AddScoped<IQueryHandler<ListarOrdenReciboParameter>,ListarOrdenReciboQuery>();
            services.AddScoped<IQueryHandler<ObtenerOrdenReciboParameter>,ObtenerOrdenReciboQuery>();
            services.AddScoped<IQueryHandler<ObtenerOrdenReciboDetalleParameter>,ObtenerOrdenReciboDetalleQuery>();
            services.AddScoped<IQueryHandler<ListarUbicacionesParameter>,ListarUbicacionesQuery>();
            services.AddScoped<IRepository<OrdenRecibo>,Repository<OrdenRecibo>>();
            services.AddScoped<IRepository<OrdenReciboDetalle>,Repository<OrdenReciboDetalle>>();
            services.AddScoped<IOrdenReciboRepository,OrdenReciboRepository>();
            

            
            
            services.AddScoped<IQueryHandler<ListarOrdenReciboByEquipoTransporteParameter>,ListarOrdenReciboByEquipoTransporteQuery>();
            services.AddScoped<IQueryHandler<ListarInventarioParameter>,ListarInventarioQuery>();
            services.AddScoped<IRepository<Area>,Repository<Area>>();
            services.AddScoped<IRepository<InventarioGeneral>,Repository<InventarioGeneral>>();
                 

             
             services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                        .AddJwtBearer(options => {
                            options.TokenValidationParameters = new TokenValidationParameters
                            {
                                ValidateIssuerSigningKey = true,
                                IssuerSigningKey = new SymmetricSecurityKey(
                                   Encoding.ASCII.GetBytes(Configuration
                                .GetSection("AppSettings:Token").Value)),
                                ValidateIssuer = false,
                                ValidateAudience = false                            
                            };
                        });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, Seed seeder)
        {
            if (env.IsDevelopment())
            {
                  app.UseExceptionHandler(builder=> { 
                    builder.Run(async context => {
                        context.Response.StatusCode = (int) HttpStatusCode.InternalServerError;
                        var error = context.Features.Get<IExceptionHandlerFeature>();
                        if(error != null)
                        {
                            context.Response.AddApplicationError(error.Error.Message); 
                            await context.Response.WriteAsync(error.Error.Message); 
                        }
                    });
                });
            }
            else
            {
                app.UseExceptionHandler(builder=> { 
                    builder.Run(async context => {
                        context.Response.StatusCode = (int) HttpStatusCode.InternalServerError;
                        var error = context.Features.Get<IExceptionHandlerFeature>();
                        if(error != null)
                        {
                            context.Response.AddApplicationError(error.Error.Message); 
                            await context.Response.WriteAsync(error.Error.Message); 
                        }
                    });
                });
               // app.UseHsts();
            }
            // app.UseHttpsRedirection();
            
            //seeder.SeedEstados();
           // seeder.SeedUsers();
            //seeder.SeedPaginas();
            //seeder.SeedRoles();
           // seeder.SeedRolPaginas();
            app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
            app.UseAuthentication();
            app.UseMvc();
        }
    }
}   
