
using CargaClic.Domain.Seguridad;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CargaClic.Data.Mappings.Seguridad
{
    public class RolConfiguration : IEntityTypeConfiguration<Rol>
    {
        public void Configure(EntityTypeBuilder<Rol> builder)
        {
            builder.ToTable("Roles","Seguridad");
            builder.HasKey(x => x.Id);
            builder.Property(x=>x.Descripcion).HasMaxLength(50).IsRequired();
            builder.Property(x=>x.Alias).HasMaxLength(10).IsRequired();
            
        }
    }
}