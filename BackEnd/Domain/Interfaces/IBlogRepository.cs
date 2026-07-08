using OnlineShop.Domain.Entities;
using OnlineShop.Domain.Interfaces;

namespace Domain.Interfaces
{
    public interface IBlogRepository : IRepository<Blog>
    {
        Task<Blog?> GetBySlugAsync(string slug );
    }
}
