
using CargaClic.Domain.Despacho;
using CargaClic.Domain.Prerecibo;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CargaClic.Data.Mappings.Prerecibo
{
    public class ManifiestoConfiguration: IEntityTypeConfiguration<Manifiesto>
    {
        public void Configure(EntityTypeBuilder<Manifiesto> builder)
        {
            builder.ToTable("Manifiesto","Despacho");
            builder.HasKey(x=>x.Id);
            builder.Property(x=>x.NumManifiesto).HasMaxLength(10);
        }
    }
}