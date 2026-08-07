using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using OnlineShop.Domain.Entities;

namespace OnlineShop.Infrastructure.Persistence;

/// <summary>
/// Seeds a dedicated ContentEditor service account for n8n / AI content automation.
/// This is NOT an external account you buy — it is created automatically inside your DB.
/// </summary>
public class ContentEditorUserInitializer(
    AppDbContext db,
    IPasswordHasher<User> passwordHasher,
    IConfiguration configuration,
    ILogger<ContentEditorUserInitializer> logger) : IDataInitializer
{
    public void InitializeData()
    {
        var email = configuration["ContentAutomation:ServiceAccountEmail"] ?? "content-bot@onlineshop.local";
        var password = configuration["ContentAutomation:ServiceAccountPassword"];

        if (string.IsNullOrWhiteSpace(password))
        {
            logger.LogWarning("ContentAutomation:ServiceAccountPassword is not set; skip content editor seed.");
            return;
        }

        if (db.Users.Any(u => u.Email == email))
            return;

        var role = db.Roles.FirstOrDefault(r => r.Id == 5); // ContentEditor
        if (role is null)
        {
            logger.LogWarning("Role Id=5 (ContentEditor) missing; skip content editor seed.");
            return;
        }

        try
        {
            var user = User.Create(
                configuration["ContentAutomation:ServiceAccountName"] ?? "Content Admin",
                email,
                configuration["ContentAutomation:ServiceAccountPhone"] ?? "09000000000",
                "Service account for automated SEO blog pipeline");

            user.SetRole(role, currentUserId: 1);
            var hashed = passwordHasher.HashPassword(user, password);
            user.ChangePassword(hashed, currentUserId: 1);

            db.Users.Add(user);
            db.Entry(user).Property(u => u.CreatedAt).CurrentValue = DateTime.UtcNow;
            db.Entry(user).Property(u => u.CreatedBy).CurrentValue = 1;
            db.SaveChanges();

            logger.LogInformation("Seeded content automation user {Email}", email);
        }
        catch (Exception ex)
        {
            logger.LogError(ex,
                "Failed to seed content automation user {Email}. Fix pending DB migrations and restart.",
                email);
        }
    }
}
