using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OnlineShop.Domain.Entities;

namespace OnlineShop.Infrastructure.Persistence.Configurations
{
    public class CartItemConfiguration : IEntityTypeConfiguration<CartItem>
    {
        public void Configure(EntityTypeBuilder<CartItem> builder)
        {
            builder.HasKey(b => b.Id);
            builder.Property(b => b.Id)
                   .ValueGeneratedOnAdd();

 
            builder.HasOne(ci => ci.Cart)
                   .WithMany(c => c.Items)
                   .HasForeignKey(ci => ci.CartId)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(ci => ci.Product)
                    .WithMany()
                    .HasForeignKey(ci => ci.ProductId)
                    .OnDelete(DeleteBehavior.Restrict);
            builder.HasOne(ci => ci.ProductOffer)
                    .WithMany()
                    .HasForeignKey(ci => ci.ProductOfferId)
                    .OnDelete(DeleteBehavior.Restrict);

            builder.Property(ci => ci.Quantity)
                   .IsRequired();

            builder.Property(ci => ci.UnitPrice)
                   .HasColumnType("decimal(18,2)")
                   .IsRequired();

        }
    }
}
