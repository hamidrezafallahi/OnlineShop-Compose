using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using OnlineShop.Domain.Entities;

using OnlineShop.Infrastructure.Persistence;

namespace OnlineShop.Infrastructure.Repositories
{
    public class BlogTagRepository : Repository<BlogTag>, IBlogTagRepository
    {
        private readonly AppDbContext _context;

        public BlogTagRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }

   
    }
      
}
