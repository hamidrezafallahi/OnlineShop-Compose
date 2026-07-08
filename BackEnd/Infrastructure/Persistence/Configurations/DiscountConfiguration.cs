using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OnlineShop.Domain.Entities;

namespace OnlineShop.Infrastructure.Persistence.Configurations
{
    public class DiscountConfiguration : IEntityTypeConfiguration<Discount>
    {
        public void Configure(EntityTypeBuilder<Discount> builder)
        {
            builder.HasKey(b => b.Id);
            builder.Property(b => b.Id)
                   .ValueGeneratedOnAdd();

            builder.Property(d => d.Title)
                   .IsRequired()
                   .HasMaxLength(150);

            builder.Property(d => d.Amount).IsRequired().HasColumnType("decimal(18,2)");
            builder.Property(d => d.Priority).IsRequired().HasColumnType("int");

            builder.Property(d => d.IsPercent).IsRequired();


            builder.Property(d => d.StartDate)
                   .IsRequired();

            builder.Property(d => d.EndDate)
                   .IsRequired();


            builder
     .HasMany(d => d.ProductOfferDiscounts)
     .WithOne(pd => pd.Discount)
     .HasForeignKey(pd => pd.DiscountId)
     .OnDelete(DeleteBehavior.Cascade);

        }
    }
}
