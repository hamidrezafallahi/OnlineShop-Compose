using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OnlineShop.Domain.Entities;

namespace OnlineShop.Infrastructure.Persistence.Configurations
{
    public class SpecialOfferConfiguration : IEntityTypeConfiguration<SpecialOffer>
    {
        public void Configure(EntityTypeBuilder<SpecialOffer> builder)
        {
            builder.HasKey(o => o.Id);
            builder.Property(o => o.Id).ValueGeneratedOnAdd();

            builder.Property(o => o.StartDate)
                   .IsRequired();

            builder.Property(o => o.EndDate)
                   .IsRequired();

            builder.Property(o => o.DisplayOrder)
                   .HasDefaultValue(0);

            // ارتباط با ProductOffers
            builder.HasOne(o => o.ProductOffer)
                   .WithMany()
                   .HasForeignKey(o => o.ProductOfferId)
                   .OnDelete(DeleteBehavior.Cascade);

            // ارتباط اختیاری با Discount
            builder.HasOne(o => o.Discount)
                   .WithMany()
                   .HasForeignKey(o => o.DiscountId)
                   .OnDelete(DeleteBehavior.SetNull);

            builder.ToTable("SpecialOffers");
        }
    }
}
