using OnlineShop.Domain.Entities;
using OnlineShop.Domain.Interfaces;

public interface IDiscountCodeRepository : IRepository<DiscountCode>
{
    Task<DiscountCode?> GetByCodeAsync(string code);
    Task<IEnumerable<DiscountCode>> GetActiveDiscountsAsync();
}

