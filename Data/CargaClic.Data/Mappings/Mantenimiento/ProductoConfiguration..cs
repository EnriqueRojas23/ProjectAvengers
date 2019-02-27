using CargaClic.Domain.Mantenimiento;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CargaClic.Data.Mappings.Mantenimiento
{
    public class ProductoConfiguration : IEntityTypeConfiguration<Producto>
    {
        public void Configure(EntityTypeBuilder<Producto> builder)
        {
            builder.ToTable("Producto","Mantenimiento");
            builder.HasKey(x=>x.Id);
            builder.Property(x=>x.Codigo).HasMaxLength(20).IsRequired();
            builder.Property(x=>x.DescripcionLarga).HasMaxLength(150).IsRequired();
        }
    }
}