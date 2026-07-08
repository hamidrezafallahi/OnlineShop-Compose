using Domain.Interfaces;
using OnlineShop.Infrastructure.Persistence;
using OnlineShop.Infrastructure.Repositories;

namespace Infrastructure.Repository
{

    public class RoleRepository: Repository<Role>, IRoleRepository
    {
        public RoleRepository(AppDbContext context) : base(context)
        {
        }
    }
}
