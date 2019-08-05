using CargaClic.Domain.Facturacion;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CargaClic.Data.Mappings.Facturacion
{
    public class DomumentoConfiguration: IEntityTypeConfiguration<Documento>
    {
        public void Configure(EntityTypeBuilder<Documento> builder)
        {
            builder.ToTable("Documento","facturacion");
            builder.HasKey(x=>x.Id);
            
        }
    }
}