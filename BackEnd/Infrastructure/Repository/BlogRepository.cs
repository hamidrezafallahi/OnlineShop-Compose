using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using OnlineShop.Domain.Entities;
using OnlineShop.Infrastructure.Persistence;
using OnlineShop.Infrastructure.Repositories;

public class BlogRepository : Repository<Blog>, IBlogRepository
{
    public BlogRepository(AppDbContext context) : base(context) { }

    public async Task<Blog?> GetBySlugAsync(string slug)
    {
        return await Query(b => b.Slug == slug)
             .Include(b => b.Author)
             .FirstOrDefaultAsync();
    }
}
