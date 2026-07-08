using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace OnlineShop.Infrastructure.Persistence.Configurations
{
    public class OrderItemConfiguration : IEntityTypeConfiguration<OrderItem>
    {
        public void Configure(EntityTypeBuilder<OrderItem> builder)
        {
            builder.HasKey(b => b.Id);
            builder.Property(b => b.Id)
                   .ValueGeneratedOnAdd();

            builder.HasOne(oi => oi.Order)
        .WithMany(o => o.Items)
        .HasForeignKey(oi => oi.OrderId)
        .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(oi => oi.ProductOffer)
                   .WithMany()
                   .HasForeignKey(oi => oi.ProductOfferId)
                   .OnDelete(DeleteBehavior.Restrict);

            builder.Property(oi => oi.UnitPrice)
         .HasColumnType("decimal(18,2)")
         .IsRequired();

            builder.Property(oi => oi.Quantity)
                   .IsRequired();

           
        }
    }
}
