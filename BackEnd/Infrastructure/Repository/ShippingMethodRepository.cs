using Microsoft.EntityFrameworkCore;
using OnlineShop.Domain.Entities;
using OnlineShop.Domain.Interfaces;
using OnlineShop.Infrastructure.Persistence;
using OnlineShop.Infrastructure.Repositories;

namespace Infrastructure.Repository
{
    public class ShippingMethodRepository : Repository<ShippingMethod>, IShippingMethodRepository
    {
        public ShippingMethodRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<ShippingMethod>> GetActiveMethodsAsync()
        {
            return await Query(sm => sm.IsActive)
                .ToListAsync();
        }
    }
}
