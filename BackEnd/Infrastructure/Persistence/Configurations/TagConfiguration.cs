using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OnlineShop.Domain.Entities;

namespace OnlineShop.Infrastructure.Persistence.Configurations
{
    public class TagConfiguration : IEntityTypeConfiguration<Tag>
    {
        public void Configure(EntityTypeBuilder<Tag> builder)
        {
            builder.HasKey(t => t.Id);

            builder.Property(t => t.Id)
                   .ValueGeneratedOnAdd();

            builder.Property(t => t.Name)
                   .IsRequired()
                   .HasMaxLength(100);

            builder.Property(t => t.Slug)
                   .IsRequired()
                   .HasMaxLength(220);

            builder.HasIndex(t => t.Slug)
                   .IsUnique()
                   .HasFilter("\"IsDeleted\" = false");

            builder.ToTable("Tags");
        }
    }
}
