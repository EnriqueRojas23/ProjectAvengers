using CargaClic.Domain.Mantenimiento;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CargaClic.Data.Mappings.Mantenimiento
{
    public class UbicacionConfiguration : IEntityTypeConfiguration<Ubicacion>
    {
        public void Configure(EntityTypeBuilder<Ubicacion> builder)
        {
            builder.ToTable("Ubicacion","Mantenimiento");
            builder.HasKey(x=>x.Id);
            builder.Property(x=>x.Nombre).HasMaxLength(20).IsRequired();
        }
    }
}