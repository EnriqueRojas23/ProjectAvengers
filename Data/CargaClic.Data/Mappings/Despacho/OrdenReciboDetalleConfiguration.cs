
using CargaClic.Domain.Despacho;
using CargaClic.Domain.Prerecibo;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CargaClic.Data.Mappings.Despacho
{
    public class OrdenSalidaDetalleConfiguration: IEntityTypeConfiguration<OrdenSalidaDetalle>
    {
        public void Configure(EntityTypeBuilder<OrdenSalidaDetalle> builder)
        {
            builder.ToTable("OrdenSalidaDetalle","Despacho");
            builder.HasKey(x=>x.Id);
            builder.Property(x=>x.OrdenSalidaId).IsRequired();
            builder.Property(x=>x.Cantidad).IsRequired();
        }
    }
}