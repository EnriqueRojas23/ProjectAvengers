using CargaClic.Domain.Facturacion;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CargaClic.Data.Mappings.Facturacion
{
    public class ComprobanteDetalleConfiguration: IEntityTypeConfiguration<ComprobanteDetalle>
    {
        public void Configure(EntityTypeBuilder<ComprobanteDetalle> builder)
        {
            builder.ToTable("ComprobanteDetalle","facturacion");
            builder.HasKey(x=>x.Id);
            
        }
    }
}