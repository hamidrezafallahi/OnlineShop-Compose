using Microsoft.EntityFrameworkCore;
using OnlineShop.Domain.Entities;
using OnlineShop.Domain.Interfaces;
using OnlineShop.Infrastructure.Persistence;
 

namespace OnlineShop.Infrastructure.Repositories
{
    public class PaymentMethodRepository : Repository<PaymentMethod>, IPaymentMethodRepository
    {
        public PaymentMethodRepository(AppDbContext context) : base(context)
        {
        }

        // ================= IPaymentMethodRepository =================
        public async Task<List<PaymentMethod>> GetActiveMethodsAsync()
        {
            return await _dbSet
                         .Where(pm => pm.IsActive)
                         .OrderBy(pm => pm.DisplayOrder)
                         .ToListAsync();
        }
    }
}
