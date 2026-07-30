using Microsoft.Extensions.Configuration;

namespace OnlineShop.Infrastructure.Security;

/// <summary>
/// IP allow/deny lists. Disabled by default until real IP tables exist.
/// Enable with Security:IpFilterEnabled=true and configure lists in config.
/// </summary>
public class SecurityService(IConfiguration configuration) : ISecurityService
{
    public Task<bool> IsIpAllowedAsync(string ip)
    {
        if (!configuration.GetValue("Security:IpFilterEnabled", false))
            return Task.FromResult(true);

        var whitelist = configuration.GetSection("Security:IpWhitelist").Get<string[]>()
                        ?? Array.Empty<string>();

        // Empty whitelist with filter enabled = deny all (fail closed).
        if (whitelist.Length == 0)
            return Task.FromResult(false);

        return Task.FromResult(whitelist.Contains(ip, StringComparer.OrdinalIgnoreCase));
    }

    public Task<bool> IsIpBlacklistedAsync(string ip)
    {
        if (!configuration.GetValue("Security:IpFilterEnabled", false))
            return Task.FromResult(false);

        var blacklist = configuration.GetSection("Security:IpBlacklist").Get<string[]>()
                        ?? Array.Empty<string>();

        return Task.FromResult(blacklist.Contains(ip, StringComparer.OrdinalIgnoreCase));
    }
}
