using Microsoft.EntityFrameworkCore;
using OnlineShop.Domain.Entities;
using OnlineShop.Domain.Interfaces;
using OnlineShop.Infrastructure.Persistence;

namespace OnlineShop.Infrastructure.Repositories
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(AppDbContext context) : base(context)
        {
        }
        public async Task<User?> GetByEmailAsync(string email)
        {
            return await _dbSet
                .FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<User?> GetByPhoneNumberAsync(string phoneNumber)
        {
            return await _dbSet
                .FirstOrDefaultAsync(u => u.PhoneNumber == phoneNumber);
        }

        public async Task<UserModel?> GetUserWithDetailsAsync(int userId)
        {
            return await Query(u => u.Id == userId)
                .Select(z => new UserModel
                {
                    FullName = z.FullName,
                    Email = z.Email,
                    PhoneNumber = z.PhoneNumber,
                    Password = z.Password,
                    RoleId = z.RoleId,
                    Image= z.Image,
                    UserDescription=z.UserDescription,
                    Role = z.Role,
                    Cart = z.Cart
                })
                .FirstOrDefaultAsync();
        }

        public IQueryable<User> Table()
        {
            return Query();
        }
    }
}