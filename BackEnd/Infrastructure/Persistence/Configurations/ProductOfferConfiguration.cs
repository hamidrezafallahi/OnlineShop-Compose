using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OnlineShop.Domain.Entities;

namespace Infrastructure.Persistence.Configurations
{
    public class ProductOfferConfiguration : IEntityTypeConfiguration<ProductOffers>
    {
        public void Configure(EntityTypeBuilder<ProductOffers> builder)
        {
            builder.HasKey(po => po.Id);

            builder.Property(po => po.Id)
                   .ValueGeneratedOnAdd();

            builder.Property(po => po.BasePrice)
                   .HasColumnType("decimal(18,2)")
                   .IsRequired();

            // ===== Product =====
            builder.HasOne(po => po.Product)
                   .WithMany()
                   .HasForeignKey(po => po.ProductId)
                   .OnDelete(DeleteBehavior.Cascade);

            // ===== Supplier =====
            builder.HasOne(po => po.Supplier)
                   .WithMany()
                   .HasForeignKey(po => po.SupplierId)
                   .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(po => po.Variant)
                   .WithMany(v => v.Offers)
                   .HasForeignKey(po => po.ProductVariantId)
                   .OnDelete(DeleteBehavior.SetNull);

            builder.HasIndex(po => po.ProductVariantId);

            // ===== Discounts (ProductOfferDiscount) =====
            builder.HasMany(po => po.Discounts)
                   .WithOne(pd => pd.ProductOffer)
                   .HasForeignKey(pd => pd.ProductOfferId)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.ToTable("ProductOffers");
        }
    }
}
