using Microsoft.EntityFrameworkCore;
using OnlineShop.Domain.Entities;
using OnlineShop.Domain.Interfaces;
using OnlineShop.Infrastructure.Persistence;
using OnlineShop.Infrastructure.Repositories;

public class DiscountRepository : Repository<Discount>, IDiscountRepository
{
    public DiscountRepository(AppDbContext context) : base(context) { }

    public async Task<Discount?> GetDiscountByProductOfferIdAsync(int productId)
    {
        var now = DateTime.UtcNow;
        var query =
            from d in _context.Discounts
            from pd in d.ProductOfferDiscounts
            where !d.IsDeleted
                  && !pd.IsDeleted
                  && pd.ProductOfferId == productId
                  && d.StartDate <= now
                  && d.EndDate >= now
            orderby d.Priority descending
            select d;

        return await query.FirstOrDefaultAsync();
    }



    public async Task<IEnumerable<Discount>> GetActiveDiscountsAsync()
    {
        var now = DateTime.UtcNow;
        return await Query(d => d.StartDate <= now && d.EndDate >= now).ToListAsync();
    }

    public async Task<bool> IsDiscountValidAsync(int discountId)
    {
        var now = DateTime.UtcNow;
        return await Query(d => d.Id == discountId && d.StartDate <= now && d.EndDate >= now)
                    .AnyAsync();
    }
}
