using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Security.Interfaces;
using Security.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Security.Services
{
    public class JwtTokenService : IJwtTokenService
    {
        private readonly TokenProviderOptions _tokenProviderOptions;

        public JwtTokenService(IOptions<TokenProviderOptions> tokenProviderOptions)
        {
            _tokenProviderOptions = tokenProviderOptions.Value;
        }

        public Task<AccessToken> GenerateAccessToken(string userId, string email, IEnumerable<Claim> claims)
        {
            var now = DateTime.UtcNow;
            var fixedClaims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub,userId),
                new Claim(JwtRegisteredClaimNames.Email,email),
                new Claim(JwtRegisteredClaimNames.Iat,new DateTimeOffset(now)
                                    .ToUniversalTime()
                                    .ToUnixTimeSeconds()
                                    .ToString(),
                                     ClaimValueTypes.Integer64),
            };

            if (claims.Any())
            {
                foreach (var claim in claims)
                {
                    if (claim.Type == ClaimTypes.Role)
                    {
                        fixedClaims.Add(new Claim("role", claim.Value));
                    }
                    else
                    {
                        fixedClaims.Add(claim);
                    }
                }
            }

            var sharedKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_tokenProviderOptions.Secret));
            var signingCredentials = new SigningCredentials(sharedKey, SecurityAlgorithms.HmacSha256);

            var expiry = now.AddMinutes(_tokenProviderOptions.AccessTokenExpiryInMinutes);

            var jwt = new JwtSecurityToken(
               issuer: _tokenProviderOptions.Issuer,
               audience: _tokenProviderOptions.Audience,
               claims: fixedClaims,
               notBefore: now,
               expires: expiry,
                signingCredentials: signingCredentials
               );

            var handler = new JwtSecurityTokenHandler();
            handler.InboundClaimTypeMap.Clear();

            var encodedJwt = handler.WriteToken(jwt);

            var response = new AccessToken
            {
                Token = encodedJwt,
                Expiry = jwt.Claims.FirstOrDefault(x => x.Type == "exp")?.Value!
            };

            return Task.FromResult(response);
        }

        public Task<RefreshToken> GenerateRefreshToken()
        {
            var randomNumber = new byte[64];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);

            var response = new RefreshToken
            {
                Token = Convert.ToBase64String(randomNumber),
                Expiry = DateTime.Now.AddDays(_tokenProviderOptions.RefreshTokenExpiryInDays)
            };

            return Task.FromResult(response);
        }

        public ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
        {
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_tokenProviderOptions.Secret)),
                ValidateLifetime = false
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out SecurityToken securityToken);
            if (securityToken is not JwtSecurityToken jwtSecurityToken || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                throw new SecurityTokenException("Invalid access token.");
            return principal;
        }
    }
}