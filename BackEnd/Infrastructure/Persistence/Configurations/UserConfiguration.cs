using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OnlineShop.Domain.Entities;

namespace OnlineShop.Infrastructure.Persistence.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(b => b.Id);
            builder.Property(b => b.Id)
                   .ValueGeneratedOnAdd();

            builder.Property(u => u.FullName)
                   .IsRequired()
                   .HasMaxLength(200);

            builder.Property(u => u.Slug)
                   .IsRequired()
                   .HasMaxLength(220);

            builder.HasIndex(u => u.Slug)
                   .IsUnique()
                   .HasFilter("\"IsDeleted\" = false");

            builder.Property(u => u.Image)
                    .HasMaxLength(200);

            builder.Property(u => u.UserDescription)
                    .HasMaxLength(300)
                    .IsRequired(false);

            builder.Property(u => u.Email)
                   .IsRequired()
                   .HasMaxLength(150);

            builder.HasIndex(u => u.Email)
                   .IsUnique();

            builder.Property(u => u.PhoneNumber)
                   .HasMaxLength(20);

            builder.Property(u => u.Password)
                   .IsRequired();

            builder.HasOne(u => u.Role)
              .WithMany(r => r.Users)
              .HasForeignKey(u => u.RoleId)
              .OnDelete(DeleteBehavior.Restrict);

            builder.HasMany(u => u.Addresses)
                   .WithOne(a => a.User)
                   .HasForeignKey(a => a.UserId)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(u => u.Cart)
                   .WithOne(c => c.User)
                   .HasForeignKey<Cart>(c => c.UserId)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
