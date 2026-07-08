using Domain.Interfaces;
using OnlineShop.Domain.Entities;
using OnlineShop.Infrastructure.Persistence;
using OnlineShop.Infrastructure.Repositories;

namespace Infrastructure.Repository
{
    public class ProductOfferTagRepository : Repository<ProductOfferTag>, IProductOfferTagRepository
    {
        public ProductOfferTagRepository(AppDbContext context) : base(context)
        {
        }
    }
}
