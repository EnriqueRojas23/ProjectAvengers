
using CargaClic.Domain.Mantenimiento;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CargaClic.Data.Mappings.Mantenimiento
{
    public class TablaConfiguration : IEntityTypeConfiguration<Tabla>
    {
        public void Configure(EntityTypeBuilder<Tabla> builder)
        {
            builder.ToTable("Tablas","Mantenimiento");
            builder.HasKey(x=>x.Id);
            builder.Property(x=>x.NombreTabla).HasMaxLength(15).IsRequired();
        }
    }
}