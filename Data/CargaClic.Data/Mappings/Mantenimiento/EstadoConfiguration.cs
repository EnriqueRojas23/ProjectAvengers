
using CargaClic.Domain.Mantenimiento;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CargaClic.Data.Mappings.Mantenimiento
{
    public class EstadoConfiguration : IEntityTypeConfiguration<Estado>
    {
        public void Configure(EntityTypeBuilder<Estado> builder)
        {
            builder.ToTable("Estados","Mantenimiento");
            builder.HasKey(x=>x.Id);
            builder.Property(x=>x.Descripcion).HasMaxLength(50);
            builder.Property(x=>x.NombreEstado).HasMaxLength(15).IsRequired();
        }
    }
}