
using CargaClic.Domain.Prerecibo;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CargaClic.Data.Mappings.Prerecibo
{
    public class OrdenReciboConfiguration: IEntityTypeConfiguration<OrdenRecibo>
    {
        public void Configure(EntityTypeBuilder<OrdenRecibo> builder)
        {
            builder.ToTable("OrdenRecibo","Recepcion");
            builder.HasKey(x=>x.Id);
            builder.Property(x=>x.NumOrden).HasMaxLength(8).IsRequired();
            builder.Property(x=>x.GuiaRemision).HasMaxLength(20);
        }
    }
}