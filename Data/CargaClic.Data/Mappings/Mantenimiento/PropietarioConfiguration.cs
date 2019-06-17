using CargaClic.Domain.Mantenimiento;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CargaClic.Data.Mappings.Mantenimiento
{
    public class PropietarioConfiguration : IEntityTypeConfiguration<Propietario>
    {
        public void Configure(EntityTypeBuilder<Propietario> builder)
        {
            builder.ToTable("Propietario","Mantenimiento");
            builder.HasKey(x=>x.Id);
            builder.Property(x=>x.Nombre).HasMaxLength(50).IsRequired();
            builder.Property(x=>x.Documento).HasMaxLength(11).IsRequired();
        }
    }
}