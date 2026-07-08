using Microsoft.AspNetCore.Http;
using System.Security.Claims;
namespace Application.Common
{
    public static class UserIdentity
    {
        public static int? GetUserId(this HttpContext context)
        {
            var claim = context.User?.FindFirst(ClaimTypes.NameIdentifier);
            if (claim == null || string.IsNullOrWhiteSpace(claim.Value))
                return null;

            return int.Parse(claim.Value);
        }
        public static string? GetRole(this HttpContext context)
        {
            var claim = context.User?.FindFirst(ClaimTypes.Role);
            if (claim == null || string.IsNullOrWhiteSpace(claim.Value))
                return null;

            return claim.Value;
        }
    }
    public static class HttpContextExtensions
    {
        public static string? GetClientIp(this HttpContext context)
        {
            var ip = context.Connection.RemoteIpAddress?.ToString();

            // اگر پشت پراکسی یا لود بالانسر باشی:
            if (context.Request.Headers.ContainsKey("X-Forwarded-For"))
            {
                ip = context.Request.Headers["X-Forwarded-For"].FirstOrDefault();
            }

            return ip;
        }

        public static string? GetUserAgent(this HttpContext context)
        {
            return context.Request.Headers["User-Agent"].ToString();
        }
    }


}
