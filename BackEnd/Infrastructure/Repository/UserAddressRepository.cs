using Microsoft.EntityFrameworkCore;
using OnlineShop.Domain.Entities;
using OnlineShop.Domain.Interfaces;
using OnlineShop.Infrastructure.Persistence;

namespace OnlineShop.Infrastructure.Repositories
{
    public class UserAddressRepository : Repository<UserAddress>, IUserAddressRepository
    {
        public UserAddressRepository(AppDbContext context) : base(context)
        {
        }

        // متد اختصاصی برای گرفتن آدرس‌های کاربر
        public async Task<IEnumerable<UserAddress>> GetAddressesByUserIdAsync(int userId)
        {
            return await Query(a => a.UserId == userId).ToListAsync();

        }

        // متد اختصاصی برای گرفتن آدرس پیش‌فرض کاربر
        public async Task<UserAddress?> GetDefaultAddressByUserIdAsync(int userId)
        {
            return await Query(a => a.UserId == userId && a.IsDefault)
         .FirstOrDefaultAsync();
        }


    }
}
