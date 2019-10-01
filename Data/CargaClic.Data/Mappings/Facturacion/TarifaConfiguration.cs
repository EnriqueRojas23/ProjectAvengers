using CargaClic.Domain.Facturacion;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CargaClic.Data.Mappings.Facturacion
{
    public class TarifaConfiguration: IEntityTypeConfiguration<Tarifa>
    {
        public void Configure(EntityTypeBuilder<Tarifa> builder)
        {
            builder.ToTable("Tarifa","facturacion");
            builder.HasKey(x=>x.Id);
            
        }
    }
}