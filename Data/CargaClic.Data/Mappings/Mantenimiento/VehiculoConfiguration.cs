using CargaClic.Domain.Mantenimiento;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CargaClic.Data.Mappings.Mantenimiento
{
    public class VehiculoConfiguration : IEntityTypeConfiguration<Vehiculo>
    {
        public void Configure(EntityTypeBuilder<Vehiculo> builder)
        {
            builder.ToTable("Vehiculo","Mantenimiento");
            builder.HasKey(x=>x.Id);
            builder.Property(x=>x.Placa).HasMaxLength(50).IsRequired();
            builder.Property(x=>x.MarcaId).HasMaxLength(11).IsRequired();
            builder.Property(x=>x.CargaUtil).HasMaxLength(11).IsRequired();
            builder.Property(x=>x.PesoBruto).HasMaxLength(11).IsRequired();
            

        }
    }
}