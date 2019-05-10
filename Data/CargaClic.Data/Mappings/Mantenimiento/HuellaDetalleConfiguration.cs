using CargaClic.Domain.Mantenimiento;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CargaClic.Data.Mappings.Mantenimiento
{
    public class HuellaDetalleConfiguration : IEntityTypeConfiguration<HuellaDetalle>
    {
        public void Configure(EntityTypeBuilder<HuellaDetalle> builder)
        {
            builder.ToTable("HuellaDetalle","Mantenimiento");
            builder.HasKey(x=>x.Id);
            builder.Property(x=>x.HuellaId).IsRequired();
            
        }
    }
}