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

            builder.Property(u => u.Image)
                    .HasMaxLength(200);

            builder.Property(u => u.UserDescription)
                    .HasMaxLength(300)
                    .IsRequired(false);

            builder.Property(u => u.Email)
                   .IsRequired()
                   .HasMaxLength(150);

            builder.HasIndex(u => u.Email)
                   .IsUnique();  // ایمیل باید یکتا باشد

            builder.Property(u => u.PhoneNumber)
                   .HasMaxLength(20);

            builder.Property(u => u.Password)
                   .IsRequired();
            builder.HasOne(u => u.Role)
              .WithMany(r => r.Users)
              .HasForeignKey(u => u.RoleId)
              .OnDelete(DeleteBehavior.Restrict);

            // رابطه با سفارشات
            //builder.HasMany(u => u.Orders)
            //       .WithOne(o => o.User)
            //       .HasForeignKey(o => o.UserId)
            //       .OnDelete(DeleteBehavior.Restrict);

            // رابطه با آدرس‌ها
            builder.HasMany(u => u.Addresses)
                   .WithOne(a => a.User)
                   .HasForeignKey(a => a.UserId)
                   .OnDelete(DeleteBehavior.Cascade);

            // رابطه یک به یک با Cart
            builder.HasOne(u => u.Cart)
                   .WithOne(c => c.User)
                   .HasForeignKey<Cart>(c => c.UserId)
                   .OnDelete(DeleteBehavior.Cascade);


        }
    }
}
