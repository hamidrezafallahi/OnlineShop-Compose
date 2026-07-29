using Microsoft.EntityFrameworkCore;
using OnlineShop.Domain.Entities;
using OnlineShop.Domain.Interfaces;
using OnlineShop.Infrastructure.Persistence;

namespace OnlineShop.Infrastructure.Repositories
{
    public class SeoSettingRepository : Repository<SeoSetting>, ISeoSettingRepository
    {
        public SeoSettingRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<SeoSetting?> ResolveAsync(string routePath)
        {
            var normalizedPath = NormalizePath(routePath);

            var exactMatch = await Query(x => x.IsActive && x.MatchType == "exact" && x.RoutePath == normalizedPath)
                .OrderByDescending(x => x.Priority)
                .ThenByDescending(x => x.Id)
                .FirstOrDefaultAsync();

            if (exactMatch != null)
            {
                return exactMatch;
            }

            return await Query(x => x.IsActive && x.MatchType == "prefix")
                .Where(x =>
                    string.IsNullOrEmpty(x.RoutePath) ||
                    normalizedPath == x.RoutePath ||
                    normalizedPath.StartsWith($"{x.RoutePath}/"))
                .OrderByDescending(x => x.RoutePath.Length)
                .ThenByDescending(x => x.Priority)
                .ThenByDescending(x => x.Id)
                .FirstOrDefaultAsync();
        }

        private static string NormalizePath(string? routePath)
        {
            return (routePath ?? string.Empty).Trim().Trim('/');
        }
    }
}
