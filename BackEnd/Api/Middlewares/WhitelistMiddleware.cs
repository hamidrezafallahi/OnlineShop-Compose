using OnlineShop.Infrastructure.Security;

public class WhitelistMiddleware
{
    private readonly RequestDelegate _next;
    private readonly IServiceScopeFactory _scopeFactory;

    public WhitelistMiddleware(RequestDelegate next, IServiceScopeFactory scopeFactory)
    {
        _next = next;
        _scopeFactory = scopeFactory;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var ip = context.Connection.RemoteIpAddress?.ToString() ?? "unknown";

        using var scope = _scopeFactory.CreateScope();
        var securityService = scope.ServiceProvider.GetRequiredService<ISecurityService>();

        var isAllowed = await securityService.IsIpAllowedAsync(ip);
        if (!isAllowed)
        {
            context.Response.StatusCode = StatusCodes.Status403Forbidden;
            await context.Response.WriteAsync("Access denied: IP not in whitelist.");
            return;
        }

        await _next(context);
    }
}
