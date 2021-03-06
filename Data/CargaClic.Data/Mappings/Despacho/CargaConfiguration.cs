
using CargaClic.Domain.Despacho;
using CargaClic.Domain.Prerecibo;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CargaClic.Data.Mappings.Despacho
{
    public class CargaConfiguration: IEntityTypeConfiguration<Carga>
    {
        public void Configure(EntityTypeBuilder<Carga> builder)
        {
            builder.ToTable("Carga","Despacho");
            builder.HasKey(x=>x.Id);
            builder.Property(x=>x.NumCarga).HasMaxLength(8).IsRequired();
        }
    }
}