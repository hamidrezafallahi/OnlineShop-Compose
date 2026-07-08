using Domain.Entities;
using Domain.Interfaces;
using OnlineShop.Infrastructure.Persistence;
using OnlineShop.Infrastructure.Repositories;

namespace Infrastructure.Repository
{
    public class ProductOfferDiscountRepository : Repository<ProductOfferDiscount>, IProductOfferDiscountRepository
    {
        public ProductOfferDiscountRepository(AppDbContext context) : base(context)
        {
        }
    }
}
