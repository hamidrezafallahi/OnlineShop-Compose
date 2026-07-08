using Microsoft.EntityFrameworkCore;
using OnlineShop.Infrastructure.Persistence;

namespace OnlineShop.Infrastructure.Security
{
     

    public class SecurityService : ISecurityService
    {
        private readonly AppDbContext _context;

        public SecurityService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<bool> IsIpAllowedAsync(string ip)
        {
            //return await _context.Roles.AnyAsync(x => x.Ip == ip && !x.IsBlacklisted);
            return await _context.Roles.AnyAsync(x => true);

        }

        public async Task<bool> IsIpBlacklistedAsync(string ip)
        {
            //return await _context.Roles.AnyAsync(x => x.Ip == ip && x.IsBlacklisted);
            return await _context.Roles.AnyAsync(x => x.Id == 7);

        }
    }
}
