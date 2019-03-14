using CargaClic.Domain.Mantenimiento;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CargaClic.Data.Mappings.Mantenimiento
{
    public class EquipoTransporteConfiguration : IEntityTypeConfiguration<EquipoTransporte>
    {
        public void Configure(EntityTypeBuilder<EquipoTransporte> builder)
        {
            builder.ToTable("EquipoTransporte","Mantenimiento");
            builder.HasKey(x=>x.Id);
            builder.Property(x=>x.Codigo).HasMaxLength(50).IsRequired();
            builder.Property(x=>x.ProveedorId).IsRequired();
            builder.Property(x=>x.VehiculoId).IsRequired();
            builder.Property(x=>x.ProveedorId).IsRequired();
        }
    }
}