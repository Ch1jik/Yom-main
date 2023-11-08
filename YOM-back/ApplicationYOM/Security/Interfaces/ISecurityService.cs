using DAL.Entities;
using Security.Models;
using System.Security.Claims;

namespace Security.Interfaces
{
    public interface ISecurityService
    {
        Task<AuthenticationResult> CreateUser(string name, string login, string email, string password, bool createActivated, string roleClaimValue);

        Task<AuthenticationResult> CreateUser(string name, string login, string email, string roleClaimValue, bool createActivated);

        Task<AuthenticationResult> CreateUser(string email, string password, bool createActivated, string roleClaimValue);

        Task<AuthenticationResult> GeneratePasswordResetToken(string userName);

        Task<AuthenticationResult> ChangePassword(string email, string currentPassword, string newPassword);

        Task<AuthenticationResult> AddUserClaim(string userId, string claimType, string claimValue);

        Task<AuthenticationResult> RemoveUserClaim(string userId, string claimType, string claimValue);

        Task<AuthenticationResult> GenerateEmailVerificationToken(string email);

        Task<AuthenticationResult> ConfirmEmail(string userId, string code);

        Task<AuthenticationResult> Login(string email, string password, IEnumerable<Claim> claims = null);

        Task<AuthenticationResult> GetAccessToken(ApplicationUser user, List<Claim> userClaims, IEnumerable<Claim> claims, object infoObject = null);

        Task<AuthenticationResult> ResetPassword(string email, string code, string password);

        Task<AuthenticationResult> ValidatePasswordResetToken(string userId, string token);

        Task<AuthenticationResult> SetUserPassword(string userId, string password);

        Task<RefreshToken> GenerateAndSaveRefreshToken(ApplicationUser user);

        Task<AuthenticationResult> ValidateAndUpdateRefreshToken(string accessToken, string refreshToken);
    }
}