using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OnlineShop.Domain.Entities;

public class OrderConfiguration : IEntityTypeConfiguration<Order>
{
    public void Configure(EntityTypeBuilder<Order> builder)
    {
        builder.HasKey(b => b.Id);

        builder.Property(b => b.Id)
               .ValueGeneratedOnAdd();

        builder.Property(o => o.OrderDate)
               .IsRequired();

        builder.Property(o => o.TotalPrice)
               .HasColumnType("decimal(18,2)")
               .IsRequired();

        builder.Property(o => o.Status)
               .IsRequired()
               .HasConversion<int>();

        builder.Property(o => o.ShippingCost)
               .HasColumnType("decimal(18,2)");

        builder.Property(o => o.DiscountAmount)
               .HasColumnType("decimal(18,2)");

        builder.Property(o => o.FinalPrice)
               .HasColumnType("decimal(18,2)");

        // ============================================================
        // Items
        // ============================================================
        builder.HasMany(o => o.Items)
               .WithOne(i => i.Order)
               .HasForeignKey(i => i.OrderId)
               .OnDelete(DeleteBehavior.Cascade);

        // ============================================================
        // Payments
        // ============================================================
        builder.HasMany(o => o.Payments)
               .WithOne(p => p.Order)
               .HasForeignKey(p => p.OrderId)
               .OnDelete(DeleteBehavior.Cascade);

        // ============================================================
        // Shipping Address (UserAddress)
        // ============================================================
        builder.HasOne(o => o.ShippingAddress)
               .WithMany()
               .HasForeignKey(o => o.ShippingAddressId)
               .OnDelete(DeleteBehavior.Restrict)
               .IsRequired();

        // ============================================================
        // Discount Code
        // ============================================================
        builder.HasOne(o => o.DiscountCode)
               .WithMany()
               .HasForeignKey(o => o.DiscountCodeId)
               .OnDelete(DeleteBehavior.SetNull);

        // ============================================================
        // Shipping Method  ( ✨ این بخش جدید و مهم )
        // ============================================================
        builder.Property(o => o.ShippingMethodId)
               .IsRequired();

        builder.HasOne(o => o.ShippingMethod)
               .WithMany()
               .HasForeignKey(o => o.ShippingMethodId)
               .OnDelete(DeleteBehavior.Restrict);
    }
}
