using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineShop.Infrastructure.Security
{
    public interface ISecurityService
    {
        Task<bool> IsIpAllowedAsync(string ip);
        Task<bool> IsIpBlacklistedAsync(string ip);
    }
}
