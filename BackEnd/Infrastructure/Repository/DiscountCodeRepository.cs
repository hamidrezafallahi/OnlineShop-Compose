using Microsoft.EntityFrameworkCore;
using OnlineShop.Infrastructure.Persistence;

namespace OnlineShop.Infrastructure.Repositories
{
    public class DiscountCodeRepository : Repository<DiscountCode>, IDiscountCodeRepository
    {
        private readonly AppDbContext _context;

        public DiscountCodeRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<DiscountCode?> GetByCodeAsync(string code)
        {

            var now = DateTime.UtcNow;
            return await _context.DiscountCode
                .Where(d => !d.IsDeleted &&
                            d.StartDate <= now &&
                            d.EndDate >= now).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<DiscountCode>> GetActiveDiscountsAsync()
        {
            var now = DateTime.UtcNow;
            return await _context.DiscountCode
                .Where(d => !d.IsDeleted &&
                            d.StartDate <= now &&
                            d.EndDate >= now)
                .ToListAsync();
        }
    }
}
