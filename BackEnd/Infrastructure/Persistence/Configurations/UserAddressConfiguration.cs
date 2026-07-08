using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OnlineShop.Domain.Entities;

namespace OnlineShop.Infrastructure.Persistence.Configurations
{
    public class UserAddressConfiguration : IEntityTypeConfiguration<UserAddress>
    {
        public void Configure(EntityTypeBuilder<UserAddress> builder)
        {
            builder.HasKey(b => b.Id);
            builder.Property(b => b.Id)
                   .ValueGeneratedOnAdd();

            builder.Property(ua => ua.City)
                   .IsRequired()
                   .HasMaxLength(100);
            builder.Property(ua => ua.Name)
       .IsRequired()
       .HasMaxLength(100);
            builder.Property(ua => ua.PhoneNumber)
       .IsRequired()
       .HasMaxLength(20);

            builder.Property(ua => ua.State)
                   .IsRequired()
                   .HasMaxLength(100);

            builder.Property(ua => ua.PostalCode)
                   .IsRequired()
                   .HasMaxLength(20);

            builder.Property(ua => ua.FullAddress)
                   .IsRequired()
                   .HasMaxLength(500);

            builder.Property(ua => ua.IsDefault)
                    .IsRequired()
                    .HasDefaultValue(false);

            //builder.HasOne(ua => ua.User)
            //       .WithMany(u => u.Addresses)
            //       .HasForeignKey(ua => ua.UserId)
            //       .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
