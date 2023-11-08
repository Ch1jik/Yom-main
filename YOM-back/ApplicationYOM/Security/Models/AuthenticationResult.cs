using Common.Models;
using System.Security.Claims;
using DAL.Entities;

namespace Security.Models
{
    public class AuthenticationResult
    {
        public bool Success { get; set; }
        public string Message { get; set; } = null!;
        public ApplicationUser User { get; set; }
        public List<Claim> UserClaims { get; set; }
        public UserInfo UserInfo { get; set; }
        public Tokens Tokens { get; set; }

        public AuthenticationResult()
        {
            UserInfo = new UserInfo();
            Tokens = new Tokens();
            User = new ApplicationUser();
            UserClaims = new List<Claim>();
        }

        public static AuthenticationResult Fail(string message)
        {
            return new AuthenticationResult
            {
                Success = false,
                Message = message
            };
        }

        public static AuthenticationResult Succeed(string message = null)
        {
            return new AuthenticationResult
            {
                Success = true,
                Message = message!
            };
        }

        public static AuthenticationResult PasswordResetToken(string userId, string resetCode, string name)
        {
            return new AuthenticationResult
            {
                Success = true,
                UserInfo = new UserInfo { UserId = userId, Name = name },
                Tokens = new Tokens { PasswordResetToken = resetCode }
            };
        }

        public static AuthenticationResult EmailVerification(string emailVerificationToken)
        {
            return new AuthenticationResult
            {
                Success = true,
                Tokens = new Tokens { EmailVerificationToken = emailVerificationToken }
            };
        }

        public static AuthenticationResult LoginResult(AccessToken accessToken, string userId, string name, string email, string role, object infoObject)
        {
            return new AuthenticationResult
            {
                Success = true,
                Tokens = new Tokens { AccessToken = accessToken },
                UserInfo = new UserInfo { UserId = userId, Name = name, Email = email, Data = infoObject, Role = role }
            };
        }

        public static AuthenticationResult TokenResult(string name, string email, string role, string accessToken = "", string refreshToken = "")
        {
            return new AuthenticationResult
            {
                Success = true,
                Tokens = new Tokens
                {
                    AccessToken = new AccessToken { Token = accessToken },
                    RefreshToken = new RefreshToken { Token = refreshToken }
                },
                UserInfo = new UserInfo { Name = name, Email = email, Role = role }
            };
        }

        public static AuthenticationResult ClaimResult(ApplicationUser user, List<Claim> claims)
        {
            return new AuthenticationResult
            {
                Success = true,
                User = user,
                UserClaims = claims
            };
        }

        public static AuthenticationResult ClaimResult(string message, ApplicationUser user, List<Claim> claims)
        {
            return new AuthenticationResult
            {
                Success = true,
                User = user,
                UserClaims = claims,
                Message = message
            };
        }
    }
}