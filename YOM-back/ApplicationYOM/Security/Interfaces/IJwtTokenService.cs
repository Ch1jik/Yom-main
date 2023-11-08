using Security.Models;
using System.Security.Claims;

namespace Security.Interfaces
{
    public interface IJwtTokenService
    {
        Task<AccessToken> GenerateAccessToken(string userId, string email, IEnumerable<Claim> claims);

        Task<RefreshToken> GenerateRefreshToken();

        ClaimsPrincipal GetPrincipalFromExpiredToken(string token);
    }
}