/// <summary>
/// Intentionally permissive. Blocking User-Agents that contain "bot"
/// breaks search-engine crawlers and SEO. Keep as a pass-through until
/// a real bot policy (Allow/Deny lists) is defined.
/// </summary>
public class SuspiciousClientMiddleware(RequestDelegate next)
{
    public Task InvokeAsync(HttpContext context) => next(context);
}
