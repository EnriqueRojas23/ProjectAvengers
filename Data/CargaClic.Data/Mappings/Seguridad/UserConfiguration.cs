
using CargaClic.Domain.Seguridad;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
    
namespace CargaClic.Data.Mappings.Seguridad
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.ToTable("Users","Seguridad");
            builder.HasKey(x=>x.Id);
            builder.Property(x=>x.Created).HasColumnType("datetime").IsRequired();
            builder.Property(x=>x.Username).HasMaxLength(15).IsRequired();
            builder.Property(x=>x.NombreCompleto).HasMaxLength(50).IsRequired();
            builder.Property(x=>x.Email).HasMaxLength(50).IsRequired();
            builder.Property(x=>x.LastActive).HasColumnType("datetime").IsRequired();
        }
    }
}