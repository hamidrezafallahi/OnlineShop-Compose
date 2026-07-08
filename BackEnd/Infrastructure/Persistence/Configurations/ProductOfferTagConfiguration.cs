using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OnlineShop.Domain.Entities;

public class ProductOfferTagConfiguration : IEntityTypeConfiguration<ProductOfferTag>
{
    public void Configure(EntityTypeBuilder<ProductOfferTag> builder)
    {
        builder.HasKey(pt => pt.Id);

        builder.HasOne(pt => pt.ProductOffer)
               .WithMany(p => p.ProductOfferTags)
               .HasForeignKey(pt => pt.ProductOfferId)
               .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(pt => pt.Tag)
               .WithMany(t => t.ProductOfferTags)
               .HasForeignKey(pt => pt.TagId)
               .OnDelete(DeleteBehavior.Cascade);
        builder.ToTable("ProductOfferTags");
    }
}
