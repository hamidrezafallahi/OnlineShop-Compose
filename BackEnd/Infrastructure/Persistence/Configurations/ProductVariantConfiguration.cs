using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OnlineShop.Domain.Entities;

namespace Infrastructure.Persistence.Configurations
{
    public class ProductVariantConfiguration : IEntityTypeConfiguration<ProductVariant>
    {
        public void Configure(EntityTypeBuilder<ProductVariant> builder)
        {
            builder.ToTable("ProductVariants");
            builder.HasKey(v => v.Id);
            builder.Property(v => v.Id).ValueGeneratedOnAdd();

            builder.Property(v => v.SizeMl).IsRequired();
            builder.Property(v => v.Concentration)
                .HasConversion<int>()
                .IsRequired();

            builder.HasIndex(v => new { v.ProductId, v.SizeMl, v.Concentration })
                .IsUnique()
                .HasFilter("\"IsDeleted\" = false");

            builder.HasOne(v => v.Product)
                .WithMany(p => p.Variants)
                .HasForeignKey(v => v.ProductId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
