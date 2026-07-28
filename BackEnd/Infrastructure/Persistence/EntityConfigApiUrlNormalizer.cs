using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace OnlineShop.Infrastructure.Persistence;

/// <summary>
/// Idempotent fix for legacy DBs created via EnsureCreated (no EF migration history).
/// Strips redundant api/ prefix from EntityConfig FetchConfig URLs.
/// </summary>
public sealed class EntityConfigApiUrlNormalizer(
    AppDbContext dbContext,
    ILogger<EntityConfigApiUrlNormalizer> logger) : IDataInitializer
{
    public void InitializeData()
    {
        try
        {
            if (!dbContext.Database.CanConnect())
                return;

            var affected = dbContext.Database.ExecuteSqlRaw(
                """
                UPDATE "EntityConfigs"
                SET "FormFieldsJson" = REPLACE(
                        REPLACE("FormFieldsJson", '"api":"/api/', '"api":"'),
                        '"api":"api/',
                        '"api":"'
                    )
                WHERE "FormFieldsJson" IS NOT NULL
                  AND (
                        "FormFieldsJson" LIKE '%"api":"api/%'
                     OR "FormFieldsJson" LIKE '%"api":"/api/%'
                  );
                """);

            if (affected > 0)
                logger.LogInformation(
                    "Normalized FetchConfig api paths on {Count} EntityConfig row(s).",
                    affected);
        }
        catch (Exception ex)
        {
            logger.LogWarning(ex, "Could not normalize EntityConfig selectOption URLs.");
        }
    }
}
