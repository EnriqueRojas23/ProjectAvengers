
using CargaClic.Domain.Despacho;
using CargaClic.Domain.Prerecibo;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CargaClic.Data.Mappings.Despacho
{
    public class OrdenSalidaConfiguration: IEntityTypeConfiguration<OrdenSalida>
    {
        public void Configure(EntityTypeBuilder<OrdenSalida> builder)
        {
            builder.ToTable("OrdenSalida","Despacho");
            builder.HasKey(x=>x.Id);
            builder.Property(x=>x.NumOrden).HasMaxLength(8).IsRequired();
            builder.Property(x=>x.GuiaRemision).HasMaxLength(20);
        }
    }
}