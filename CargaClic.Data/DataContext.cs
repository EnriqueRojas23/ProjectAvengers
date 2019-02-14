using CargaClic.Data;
using CargaClic.Data.Domain.Mantenimiento;
using CargaClic.Data.Domain.Seguridad;
using CargaClic.Data.Mappings.Mantenimiento;
using CargaClic.Data.Mappings.Seguridad;
using Microsoft.EntityFrameworkCore;

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


        protected override void OnModelCreating(ModelBuilder builder)
        {

            
            builder.ApplyConfiguration(new UserConfiguration());
            builder.ApplyConfiguration(new PaginaConfiguration());
            builder.ApplyConfiguration(new RolConfiguration ());
            builder.ApplyConfiguration(new RolPaginaConfiguration());
            builder.ApplyConfiguration(new EstadoConfiguration());
            builder.ApplyConfiguration(new TablaConfiguration());

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