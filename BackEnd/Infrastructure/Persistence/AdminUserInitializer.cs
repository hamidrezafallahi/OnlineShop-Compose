using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using OnlineShop.Domain.Entities;

namespace OnlineShop.Infrastructure.Persistence;

public class AdminUserInitializer(
    AppDbContext db,
    IPasswordHasher<User> passwordHasher,
    IConfiguration configuration,
    ILogger<AdminUserInitializer> logger) : IDataInitializer
{
    public void InitializeData()
    {
        var adminEmail = configuration["Seed:AdminEmail"] ?? "hamidreza.lipar@gmail.com";
        var adminPassword = configuration["Seed:AdminPassword"];

        if (string.IsNullOrWhiteSpace(adminPassword))
        {
            logger.LogWarning("Seed:AdminPassword is not set; skip admin user seed.");
            return;
        }

        if (db.Users.Any(u => u.Email == adminEmail))
            return;

        var role = db.Roles.FirstOrDefault(r => r.Id == 1);
        if (role is null)
        {
            logger.LogWarning("Role Id=1 (SuperAdmin) missing; skip admin user seed.");
            return;
        }

        var user = User.Create(
            "مدیر سیستم",
            adminEmail,
            configuration["Seed:AdminPhone"] ?? "09121720295",
            "مدیر اصلی سیستم");

        user.SetRole(role, currentUserId: 1);

        var hashed = passwordHasher.HashPassword(user, adminPassword);
        user.ChangePassword(hashed, currentUserId: 1);

        db.Users.Add(user);
        db.Entry(user).Property(u => u.CreatedAt).CurrentValue = DateTime.UtcNow;
        db.Entry(user).Property(u => u.CreatedBy).CurrentValue = 1;

        db.SaveChanges();
        logger.LogInformation("Seeded admin user {Email}", adminEmail);
    }
}
