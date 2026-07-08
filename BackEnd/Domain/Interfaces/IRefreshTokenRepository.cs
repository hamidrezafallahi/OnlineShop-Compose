using OnlineShop.Domain.Entities;
using System.Linq.Expressions;

namespace OnlineShop.Domain.Interfaces
{
    public interface IRefreshTokenRepository : IRepository<RefreshToken>
    {
        // پیدا کردن توکن با مقدار رشته‌ای آن
        Task<RefreshToken?> GetByTokensAsync(string AccessToken, string RefreshToken);

        // گرفتن تمام توکن‌های فعال یک کاربر
        Task<List<RefreshToken>> GetActiveTokensByUserIdAsync(int userId);

        // گرفتن توکن‌ها با شرط دلخواه
        IQueryable<RefreshToken> Table(Expression<Func<RefreshToken, bool>>? predicate = null);
    }
}
