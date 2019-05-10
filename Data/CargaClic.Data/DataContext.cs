using CargaClic.Data;
using CargaClic.Domain.Mantenimiento;
using CargaClic.Domain.Seguridad;
using CargaClic.Data.Mappings.Mantenimiento;
using CargaClic.Data.Mappings.Seguridad;
using Microsoft.EntityFrameworkCore;
using CargaClic.Data.Mappings.Prerecibo;
using CargaClic.Domain.Prerecibo;
using CargaClic.Domain.Inventario;

namespace CargaClic.Data
{
    public class DataContext : DbContext // Usar, modificar o ampliar métodos de esta clase
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) {}  
        public DbSet<Pagina> Paginas { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Rol> Roles { get; set; }
        public DbSet<Tabla> Tablas {get;set;}
        public DbSet<Estado> Estados {get;set;}
        public DbSet<RolPagina> RolPaginas {get;set;}
        public DbSet<Cliente> Clientes {get;set;}
        public DbSet<OrdenRecibo> OrdenesRecibo {get;set;}
        public DbSet<OrdenReciboDetalle> OrdenesReciboDetalle {get;set;}

        public DbSet<Proveedor> Proveedor {get;set;}
        public DbSet<Chofer> Chofer {get;set;}
        public DbSet<Vehiculo> Vehiculo {get;set;}
        public DbSet<EquipoTransporte> EquipoTransporte {get;set;}
        public DbSet<Ubicacion> Ubicacion {get;set;}
        public DbSet<InventarioGeneral> InventarioGeneral {get;set;}
        public DbSet<Huella> Huella {get;set;}
        public DbSet<HuellaDetalle> HuellaDetalle {get;set;}
        public DbSet<ValorTabla> ValorTabla {get;set;}

        public DbSet<Producto> Producto {get;set;}
        
        protected override void OnModelCreating(ModelBuilder builder)
        {

            builder.ApplyConfiguration(new UserConfiguration());
            builder.ApplyConfiguration(new PaginaConfiguration());
            builder.ApplyConfiguration(new RolConfiguration ());
            builder.ApplyConfiguration(new RolPaginaConfiguration());
            builder.ApplyConfiguration(new EstadoConfiguration());
            builder.ApplyConfiguration(new TablaConfiguration());
            builder.ApplyConfiguration(new ClienteConfiguration());
            builder.ApplyConfiguration(new OrdenReciboConfiguration());
            builder.ApplyConfiguration(new OrdenReciboDetalleConfiguration());
            builder.ApplyConfiguration(new InventarioGeneralConfiguration());
            builder.ApplyConfiguration(new ValorTablaConfiguration());

            builder.ApplyConfiguration(new VehiculoConfiguration());
            builder.ApplyConfiguration(new ChoferConfiguration());
            builder.ApplyConfiguration(new ProveedorConfiguration());
            builder.ApplyConfiguration(new EquipoTransporteConfiguration());
            builder.ApplyConfiguration(new UbicacionConfiguration());
            builder.ApplyConfiguration(new HuellaConfiguration());
            builder.ApplyConfiguration(new AreaConfiguration());
            builder.ApplyConfiguration(new HuellaDetalleConfiguration());
            builder.ApplyConfiguration(new ProductoConfiguration());

            base.OnModelCreating(builder);

            builder.Entity<RolPagina>()
                .Property(x=>x.permisos).HasMaxLength(3).IsRequired();
            
            builder.Entity<RolPagina>()
                .ToTable("RolesPaginas","Seguridad")
                .HasKey(rp => new { rp.IdRol, rp.IdPagina });
                

            builder.Entity<RolPagina>()
                .HasOne(rp => rp.Pagina)
                .WithMany(p => p.RolPaginas)
                .HasForeignKey(p => p.IdPagina);
            builder.Entity<RolPagina>()
                .HasOne(rp => rp.Rol)
                .WithMany(r => r.RolPaginas)
                .HasForeignKey(r => r.IdRol);



            builder.Entity<RolUser>()
                .ToTable("RolesUsers","Seguridad")
                .HasKey(rp => new { rp.RolId, rp.UserId });
            builder.Entity<RolUser>()
                .HasOne(rp => rp.Rol)
                .WithMany(p => p.RolUser)
                .HasForeignKey(p => p.RolId);
            builder.Entity<RolUser>()
                .HasOne(rp => rp.User)
                .WithMany(r => r.RolUser)
                .HasForeignKey(r => r.UserId);
        }
    }
}