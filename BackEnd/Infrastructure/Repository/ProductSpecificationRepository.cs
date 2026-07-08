using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using OnlineShop.Domain.Entities;
using OnlineShop.Domain.Interfaces;
using OnlineShop.Infrastructure.Persistence;

namespace OnlineShop.Infrastructure.Repositories
{
    public class ProductSpecificationRepository : Repository<ProductSpecification>, IProductSpecificationRepository
    {
        public ProductSpecificationRepository(AppDbContext context) : base(context)
        {
        }

    }
}
