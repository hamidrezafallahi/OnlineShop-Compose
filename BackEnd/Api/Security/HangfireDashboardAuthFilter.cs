using Hangfire.Dashboard;

namespace Api.Security;

/// <summary>
/// Hangfire dashboard: open in Development; in Production require Hangfire:DashboardEnabled=true.
/// Production access should also stay IP-restricted at nginx.
/// </summary>
public sealed class HangfireDashboardAuthFilter(IHostEnvironment environment, IConfiguration configuration)
    : IDashboardAuthorizationFilter
{
    public bool Authorize(DashboardContext context)
    {
        if (environment.IsDevelopment())
            return true;

        return configuration.GetValue("Hangfire:DashboardEnabled", false);
    }
}
