using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OnlineShop.Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace OnlineShop.Infrastructure.Persistence.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        private readonly IPasswordHasher<User> _passwordHasher;

        // Constructor برای تزریق PasswordHasher
        public UserConfiguration(IPasswordHasher<User> passwordHasher)
        {
            _passwordHasher = passwordHasher;
        }

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

            // ===== Seed Data =====
            var tempUser = User.Create(
                "مدیر سیستم",
                "hamidreza.lipar@gmail.com",
                "09121720295",
                "مدیر اصلی سیستم"
            );
            
            // هش کردن پسورد
            var hashedPassword = _passwordHasher.HashPassword(tempUser, "Admin@123");

            builder.HasData(
                new
                {
                    Id = 1,
                    FullName = "مدیر سیستم",
                    Email = "hamidreza.lipar@gmail.com",
                    PhoneNumber = "09121720295",
                    Password = hashedPassword,  // استفاده از متغیر هش شده
                    Image = "",
                    UserDescription = "مدیر اصلی سیستم",
                    RoleId = 1,
                    IsActive = true,
                    CreatedAt = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc),
                    CreatedBy = 1,
                    IsDeleted = false
                }
            );
        }
    }
}