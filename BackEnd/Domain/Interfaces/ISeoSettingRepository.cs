using OnlineShop.Domain.Entities;

namespace OnlineShop.Domain.Interfaces
{
    public interface ISeoSettingRepository : IRepository<SeoSetting>
    {
        Task<SeoSetting?> ResolveAsync(string routePath);
    }
}
