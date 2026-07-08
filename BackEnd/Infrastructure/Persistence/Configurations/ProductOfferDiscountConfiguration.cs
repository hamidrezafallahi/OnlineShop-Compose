using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OnlineShop.Domain.Entities;

namespace OnlineShop.Infrastructure.Persistence.Configurations
{
    public class ProductOfferDiscountConfiguration : IEntityTypeConfiguration<ProductOfferDiscount>
    {
        public void Configure(EntityTypeBuilder<ProductOfferDiscount> builder)
        {
            builder.HasKey(pd => pd.Id);

            builder.Property(pd => pd.Id)
                   .ValueGeneratedOnAdd();
            builder.HasOne(pd => pd.ProductOffer)
        .WithMany(po => po.Discounts)
        .HasForeignKey(pd => pd.ProductOfferId)
        .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(pd => pd.Discount)
                   .WithMany(d => d.ProductOfferDiscounts)
                   .HasForeignKey(pd => pd.DiscountId)
                   .OnDelete(DeleteBehavior.Cascade);
            builder.ToTable("ProductOfferDiscount");
        }
    }
}
