using Microsoft.EntityFrameworkCore;
using OnlineShop.Domain.Entities;
using OnlineShop.Domain.Enums;
using OnlineShop.Domain.Interfaces;
using OnlineShop.Infrastructure.Persistence;

namespace OnlineShop.Infrastructure.Repositories
{
    public class ProductVariantRepository : Repository<ProductVariant>, IProductVariantRepository
    {
        private readonly AppDbContext _context;

        public ProductVariantRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }

        public Task<ProductVariant?> FindAsync(
            int productId,
            int sizeMl,
            PerfumeConcentration concentration,
            CancellationToken cancellationToken = default)
        {
            return _context.ProductVariants.FirstOrDefaultAsync(
                v => v.ProductId == productId
                     && v.SizeMl == sizeMl
                     && v.Concentration == concentration
                     && !v.IsDeleted,
                cancellationToken);
        }
    }
}
