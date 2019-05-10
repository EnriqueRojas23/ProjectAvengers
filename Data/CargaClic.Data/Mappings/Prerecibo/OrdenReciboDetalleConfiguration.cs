
using CargaClic.Domain.Prerecibo;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CargaClic.Data.Mappings.Prerecibo
{
    public class OrdenReciboDetalleConfiguration: IEntityTypeConfiguration<OrdenReciboDetalle>
    {
        public void Configure(EntityTypeBuilder<OrdenReciboDetalle> builder)
        {
            builder.ToTable("OrdenReciboDetalle","Recepcion");
            builder.HasKey(x=>x.Id);
            builder.Property(x=>x.OrdenReciboId).IsRequired();
            builder.Property(x=>x.Cantidad).IsRequired();
        }
    }
}