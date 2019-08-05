using CargaClic.Domain.Facturacion;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CargaClic.Data.Mappings.Facturacion
{
    public class ComprobanteConfiguration: IEntityTypeConfiguration<Comprobante>
    {
        public void Configure(EntityTypeBuilder<Comprobante> builder)
        {
            builder.ToTable("Comprobante","facturacion");
            builder.HasKey(x=>x.Id);
            
        }
    }
}