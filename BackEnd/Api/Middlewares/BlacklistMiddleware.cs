using OnlineShop.Infrastructure.Security;

public class BlacklistMiddleware
{
    private readonly RequestDelegate _next;
    private readonly IServiceScopeFactory _scopeFactory;

    public BlacklistMiddleware(RequestDelegate next, IServiceScopeFactory scopeFactory)
    {
        _next = next;
        _scopeFactory = scopeFactory;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var ip = context.Connection.RemoteIpAddress?.ToString() ?? "unknown";

        using var scope = _scopeFactory.CreateScope();
        var securityService = scope.ServiceProvider.GetRequiredService<ISecurityService>();

        var isBlacklisted = await securityService.IsIpBlacklistedAsync(ip);
        if (isBlacklisted)
        {
            context.Response.StatusCode = StatusCodes.Status403Forbidden;
            await context.Response.WriteAsync("Access denied: IP is blacklisted.");
            return;
        }

        await _next(context);
    }
}
