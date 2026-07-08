using System.Security.Claims;

namespace Application.Common.Interfaces
{
    public interface IJwtService
    {
        string GenerateToken(List<Claim> claims);
        string GenerateRefreshToken();

    }
}
