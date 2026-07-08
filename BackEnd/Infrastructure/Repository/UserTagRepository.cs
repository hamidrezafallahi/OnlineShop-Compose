using Domain.Interfaces;
using OnlineShop.Domain.Entities;

using OnlineShop.Infrastructure.Persistence;

namespace OnlineShop.Infrastructure.Repositories
{
    public class UserTagRepository : Repository<UserTag>, IUserTagRepository
    {
        private readonly AppDbContext _context;

        public UserTagRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }

   
    }
      
}
