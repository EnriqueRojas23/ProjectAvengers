
using CargaClic.Domain.Despacho;
using CargaClic.Domain.Prerecibo;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CargaClic.Data.Mappings.Prerecibo
{
    public class WrkConfiguration: IEntityTypeConfiguration<Wrk>
    {
        public void Configure(EntityTypeBuilder<Wrk> builder)
        {
            builder.ToTable("Wrk","Despacho");
            builder.HasKey(x=>x.Id);
        }
    }
}