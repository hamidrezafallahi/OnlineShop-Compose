using OnlineShop.Domain.Entities;
using OnlineShop.Domain.Enums;

namespace OnlineShop.Domain.Interfaces
{
    public interface IProductVariantRepository : IRepository<ProductVariant>
    {
        Task<ProductVariant?> FindAsync(
            int productId,
            int sizeMl,
            PerfumeConcentration concentration,
            CancellationToken cancellationToken = default);
    }
}
