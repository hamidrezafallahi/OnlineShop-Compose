using Microsoft.EntityFrameworkCore;
using OnlineShop.Domain.Entities;
using OnlineShop.Domain.Interfaces;
using OnlineShop.Infrastructure.Persistence;

namespace OnlineShop.Infrastructure.Repositories
{
    public class SpecialOfferRepository : Repository<SpecialOffer>, ISpecialOfferRepository
    {
        public SpecialOfferRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<SpecialOffer>> GetActiveOffersAsync()
        {
            var now = DateTime.UtcNow;
            return await Query(o => o.StartDate <= now && o.EndDate >= now && o.IsActive)
                .Include(o => o.ProductOffer)
                   .ThenInclude(p => p.Product)
                    .ThenInclude(p => p.Images)
                .Include(o => o.Discount)
                .ToListAsync();
        }

        public async Task<IEnumerable<SpecialOffer>> GetOffersByProductIdAsync(int productId)
        {
            return await Query(o => o.ProductOfferId == productId)
                .Include(o => o.Discount)
                .ToListAsync();
        }

        public async Task<IEnumerable<SpecialOffer>> GetTodayOffersAsync()
        {
            var today = DateTime.UtcNow.Date;
            return await Query(o => o.StartDate.Date <= today && o.EndDate.Date >= today && o.IsActive)
                .Include(o => o.ProductOffer)
                .ThenInclude(p => p.Product)
                    .ThenInclude(p => p.Images)
                .Include(o => o.Discount)
                .OrderBy(o => o.DisplayOrder)
                .ToListAsync();
        }

        public async Task<IEnumerable<SpecialOffer>> GetAllWithIncludesAsync()
        {
            return await Query()
                .Include(o => o.ProductOffer)
                   .ThenInclude(o => o.Product)
                    .ThenInclude(p => p.Brand)
                .Include(o => o.Discount)
                .OrderBy(o => o.DisplayOrder)
                .ToListAsync();
        }

        public async Task<bool> HasActiveOfferAsync(int productId)
        {
            var now = DateTime.UtcNow;
            return await Query(o => o.ProductOfferId == productId && o.StartDate <= now && o.EndDate >= now && o.IsActive)
                .AnyAsync();
        }
    }
}
