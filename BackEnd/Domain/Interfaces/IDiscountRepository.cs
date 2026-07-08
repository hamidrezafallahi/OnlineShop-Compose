using OnlineShop.Domain.Entities;

namespace OnlineShop.Domain.Interfaces;

public interface IDiscountRepository : IRepository<Discount>
{
    Task<Discount?> GetDiscountByProductOfferIdAsync(int productId);
    Task<IEnumerable<Discount>> GetActiveDiscountsAsync();
    Task<bool> IsDiscountValidAsync(int discountId);
}