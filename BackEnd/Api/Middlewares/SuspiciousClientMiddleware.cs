public class SuspiciousClientMiddleware
{
    private readonly RequestDelegate _next;

    public SuspiciousClientMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var userAgent = context.Request.Headers["User-Agent"].ToString();
        if (string.IsNullOrEmpty(userAgent) || userAgent.Contains("bot", StringComparison.OrdinalIgnoreCase))
        {
            context.Response.StatusCode = StatusCodes.Status403Forbidden;
            await context.Response.WriteAsync("Suspicious client detected.");
            return;
        }

        await _next(context);
    }
}
