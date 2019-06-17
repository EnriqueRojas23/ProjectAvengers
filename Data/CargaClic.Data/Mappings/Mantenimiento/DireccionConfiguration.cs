using CargaClic.Domain.Mantenimiento;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CargaClic.Data.Mappings.Mantenimiento
{
    public class DireccionConfiguration : IEntityTypeConfiguration<Direccion>
    {
        public void Configure(EntityTypeBuilder<Direccion> builder)
        {
            builder.ToTable("Direccion","Mantenimiento");
            builder.HasKey(x=>x.iddireccion);
            builder.Property(x=>x.codigo).HasMaxLength(10).IsRequired();
            builder.Property(x=>x.direccion).HasMaxLength(50).IsRequired();
        }
    }
}