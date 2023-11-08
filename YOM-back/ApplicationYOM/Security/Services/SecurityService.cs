using Common.Models;
using Microsoft.AspNetCore.Identity;
using Security.Interfaces;
using Security.Models;
using System.Security.Claims;
using DAL.Entities;

namespace Security.Services
{
    public class SecurityService : ISecurityService
    {
        private readonly IJwtTokenService _tokenGenerator;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public SecurityService(
            IJwtTokenService tokenGenerator,
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager)
        {
            _tokenGenerator = tokenGenerator;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        /// <summary>
        ///
        /// </summary>
        /// <param name="email"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        public virtual async Task<AuthenticationResult> Login(string email, string password, IEnumerable<Claim> claims = null)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
                return AuthenticationResult.Fail("Credentials not recognised.");

            var result = await _signInManager.PasswordSignInAsync(user.UserName, password, false, lockoutOnFailure: true);
            if (result.IsLockedOut)
                return AuthenticationResult
                    .Fail("Your account has been temporarily locked. Please try again in 5 minutes.");

            if (result.Succeeded)
            {
                var userClaims = (await _userManager.GetClaimsAsync(user)).ToList();
                return AuthenticationResult.ClaimResult(user, userClaims);
            }

            return AuthenticationResult
                    .Fail("Credentials not recognised.");
        }

        /// <summary>
        ///
        /// </summary>
        /// <param name="name"></param>
        /// <param name="email"></param>
        /// <param name="password"></param>
        /// <param name="createActivated"></param>
        /// <param name="roleClaimValue"></param>
        /// <returns></returns>
        public async Task<AuthenticationResult> CreateUser(string name, string login, string email, string password, bool createActivated, string roleClaimValue)
        {
            var newUser = new ApplicationUser() { FullName = name, UserName = login, Email = email };

            if (createActivated)
                newUser.EmailConfirmed = true;

            var result = await _userManager.CreateAsync(newUser, password);
            if (result.Succeeded)
            {
                if (!string.IsNullOrEmpty(roleClaimValue))
                {
                    await _userManager.AddClaimAsync(newUser, new Claim(ClaimTypes.Role, roleClaimValue));
                }

                return new AuthenticationResult()
                {
                    Success = true,
                    Message = "User registered successfully.",
                    UserInfo = new UserInfo() { UserId = newUser.Id }
                };
            }

            return AuthenticationResult.Fail(
               result.Errors.FirstOrDefault() != null
                   ? result.Errors.FirstOrDefault()!.Description
                   : "Failed to create the user.");
        }

        /// <summary>
        /// Creates the specified user with no password
        /// </summary>
        /// <param name="name"></param>
        /// <param name="email"></param>
        /// <param name="createActivated"></param>
        /// <param name="roleClaimValue"></param>
        /// <returns></returns>
        public async Task<AuthenticationResult> CreateUser(string name, string login, string email, string roleClaimValue, bool createActivated)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user != null)
            {
                return AuthenticationResult.Fail("This email address is already in use.");
            }

            var newUser = new ApplicationUser() { FullName = name, UserName = login, Email = email };

            if (createActivated)
                newUser.EmailConfirmed = true;

            var result = await _userManager.CreateAsync(newUser);
            if (result.Succeeded)
            {
                if (!string.IsNullOrEmpty(roleClaimValue))
                {
                    await _userManager.AddClaimAsync(newUser, new Claim(ClaimTypes.Role, roleClaimValue));
                }

                return new AuthenticationResult()
                {
                    Success = true,
                    Message = "User registered successfully.",
                    UserInfo = new UserInfo() { UserId = newUser.Id }
                };
            }

            return AuthenticationResult.Fail(
               result.Errors.FirstOrDefault() != null
                   ? result.Errors.FirstOrDefault()!.Description
                   : "Failed to create the user.");
        }

        /// <summary>
        ///
        /// </summary>
        /// <param name="email"></param>
        /// <param name="password"></param>
        /// <param name="createActivated"></param>
        /// <param name="roleClaimValue"></param>
        /// <returns></returns>
        public virtual async Task<AuthenticationResult> CreateUser(string email, string password, bool createActivated, string roleClaimValue)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user != null)
            {
                return AuthenticationResult.Fail("This email address is already in use.");
            }

            var newUser = new ApplicationUser() { Email = email, UserName = email };

            if (createActivated)
                newUser.EmailConfirmed = true;

            var result = await _userManager.CreateAsync(newUser, password);
            if (result.Succeeded)
            {
                if (!string.IsNullOrEmpty(roleClaimValue))
                    await _userManager.AddClaimAsync(newUser, new Claim(ClaimTypes.Role, roleClaimValue));

                return new AuthenticationResult()
                {
                    Success = true,
                    Message = "User registered successfully.",
                    UserInfo = new UserInfo() { UserId = newUser.Id }
                };
            }

            return AuthenticationResult.Fail(
               result.Errors.FirstOrDefault() != null
                   ? result.Errors.FirstOrDefault()!.Description
                   : "Failed to create the user.");
        }

        public virtual async Task<AuthenticationResult> ChangePassword(string email, string currentPassword, string newPassword)
        {
            var user = await _userManager.FindByEmailAsync(email);

            if (user == null)
            {
                user = await _userManager.FindByNameAsync(email);
                if (user == null)
                {
                    return AuthenticationResult.Fail("No user exists with the specified email address.");
                }
            }
            var result = await _userManager.ChangePasswordAsync(user, currentPassword, newPassword);
            if (result.Succeeded)
            {
                return
                    AuthenticationResult.Succeed(message: "Password changed successfully.");
            }
            string message = !result.Errors.Any() ?
                "Failed to change the password." :
                result.Errors.Aggregate("", (current, error) => current + (error.Description + "\n")).TrimEnd('\n');
            return AuthenticationResult.Fail(message);
        }

        /// <summary>
        /// Generate Password Reset Token.
        /// AuthenticationResult.Succeed : UserId:guid
        ///           restCode:string
        /// </summary>
        /// <param name="userName"></param>
        /// <returns></returns>
        public virtual async Task<AuthenticationResult> GeneratePasswordResetToken(string userName)
        {
            var user = await _userManager.FindByEmailAsync(userName);
            if (user == null)
            {
                return AuthenticationResult.Fail("This email address is not registered with us.");
            }

            var resetCode = await _userManager.GeneratePasswordResetTokenAsync(user);
            return AuthenticationResult.PasswordResetToken(user.Id, resetCode, user.FullName ?? string.Empty);
        }

        /// <summary>
        /// Add Claim to the user.
        /// </summary>
        /// <param name="userId">Primary Key</param>
        /// <param name="claimType"></param>
        /// <param name="claimValue"></param>
        /// <returns></returns>
        public virtual async Task<AuthenticationResult> AddUserClaim(string userId, string claimType, string claimValue)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return AuthenticationResult.Fail("User with the specified Id is not found.");
            }

            var userClaims = await _userManager.GetClaimsAsync(user);

            if (userClaims.Any())
            {
                var givenClaim = userClaims.FirstOrDefault(x => x.Type.ToLower() == claimType.ToLower() && x.Value.ToLower() == claimValue.ToLower());

                if (givenClaim != null)
                {
                    return AuthenticationResult.Succeed(message: "The specified claim is already assigned to user, try a different value.");
                }
            }
            var result = await _userManager.AddClaimAsync(user, new Claim(claimType, claimValue));

            if (result.Succeeded)
            {
                return AuthenticationResult.Succeed(message: "Claim added.");
            }

            var message = result.Errors.FirstOrDefault() != null
                ? result.Errors.FirstOrDefault()!.Description
                : "Failed to add the claim.";

            return AuthenticationResult.Fail(message);
        }

        /// <summary>
        /// Removes Claim from the user
        /// </summary>
        /// <param name="userId">Primary Key</param>
        /// <param name="claimType"></param>
        /// <param name="claimValue"></param>
        /// <returns></returns>
        public virtual async Task<AuthenticationResult> RemoveUserClaim(string userId, string claimType, string claimValue)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return AuthenticationResult.Fail("User with the specified Id is not found.");
            }

            var userClaims = await _userManager.GetClaimsAsync(user);

            if (userClaims.Any())
            {
                var givenClaim = userClaims.FirstOrDefault(x => x.Type.ToLower() == claimType.ToLower() && x.Value.ToLower() == claimValue.ToLower());

                if (givenClaim == null)
                {
                    return AuthenticationResult.Succeed(message: "User doesn't have the specified claim.");
                }
            }

            var result = await _userManager.RemoveClaimAsync(user, new Claim(claimType, claimValue));

            if (result.Succeeded)
            {
                return AuthenticationResult.Succeed(message: "Claim removed successfully.");
            }

            return AuthenticationResult.Fail(result.Errors.FirstOrDefault() != null ?
                result.Errors.FirstOrDefault()!.Description : "Failed to remove the claim.");
        }

        /// <summary>
        /// Generate Email verification token
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        public virtual async Task<AuthenticationResult> GenerateEmailVerificationToken(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);

            if (user == null)
            {
                return AuthenticationResult.Fail("No user exists with the specified email address.");
            }

            var varficationCode = _userManager.GenerateEmailConfirmationTokenAsync(user).Result;

            if (string.IsNullOrWhiteSpace(varficationCode))
            {
                return AuthenticationResult.Fail("Email varification could not be generated.");
            }

            return AuthenticationResult.EmailVerification(varficationCode);
        }

        /// <summary>
        /// Verify Email of the user.
        /// </summary>
        /// <param name="userId">Primary Key</param>
        /// <param name="verificationCode"></param>
        /// <returns></returns>
        public virtual async Task<AuthenticationResult> VerifyEmail(string userId, string verificationCode)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                return AuthenticationResult.Fail("No user exists with the specified email address.");
            }

            var response = await _userManager.ConfirmEmailAsync(user, verificationCode);

            if (response.Succeeded)
            {
                return AuthenticationResult.Succeed(message: "Email confirmed.");
            }
            var message = response.Errors.FirstOrDefault() != null
                ? response.Errors.FirstOrDefault()!.Description
                : "Email confirmation failed.";
            return
                AuthenticationResult.Fail(message);
        }

        /// <summary>
        /// Reset Password
        /// </summary>
        /// <param name="email"></param>
        /// <param name="code"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        public virtual async Task<AuthenticationResult> ResetPassword(string email, string code, string password)
        {
            var user = await _userManager.FindByIdAsync(email);
            if (user == null)
            {
                return AuthenticationResult.Fail("No user exists with the specified user Id.");
            }

            var result = await _userManager.ResetPasswordAsync(user, code, password);

            if (result.Succeeded)
            {
                var userClaims = (await _userManager.GetClaimsAsync(user)).ToList();
                return AuthenticationResult.ClaimResult("Your password has been updated.", user, userClaims);
            }

            return AuthenticationResult.Fail(
                result.Errors.FirstOrDefault() != null
                    ? result.Errors.FirstOrDefault()!.Description
                    : "Password reset failed");
        }

        /// <summary>
        /// Used to validate Password Reset Token
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="token"></param>
        /// <returns></returns>
        public virtual async Task<AuthenticationResult> ValidatePasswordResetToken(string userId, string token)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (string.IsNullOrWhiteSpace(token))
            {
                return AuthenticationResult.Fail("Please provide a valid token to validate.");
            }
            if (user is null)
                return AuthenticationResult.Fail("Token is in-valid.");
            var result = await _userManager.VerifyUserTokenAsync(user, "Default", "ResetPassword", token);
            return result ? AuthenticationResult.Succeed("Token is valid.") : AuthenticationResult.Fail("Token is in-valid.");
        }

        /// <summary>
        ///
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="code"></param>
        /// <returns></returns>
        public virtual async Task<AuthenticationResult> ConfirmEmail(string userId, string code)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user != null)
            {
                return AuthenticationResult.Fail("invalid user Id.");
            }

            var result = await _userManager.ConfirmEmailAsync(user!, code);
            if (result.Succeeded)
            {
                return AuthenticationResult.Succeed("email confirmed");
            }

            return AuthenticationResult.Fail(
               result.Errors.FirstOrDefault() != null
                   ? result.Errors.FirstOrDefault()!.Description
                   : "failed to confirm email");
        }

        /// <summary>
        ///
        /// </summary>
        /// <param name="user"></param>
        /// <param name="userClaims"></param>
        /// <param name="claims"></param>
        /// <returns></returns>
        public async Task<AuthenticationResult> GetAccessToken(ApplicationUser user, List<Claim> userClaims, IEnumerable<Claim> claims, object infoObject = null)
        {
            if (claims != null)
            {
                userClaims.AddRange(claims);
            }
            if (string.IsNullOrEmpty(user.Email))
            {
                return AuthenticationResult.Fail("Email cannot be empty.");
            }
            var token = await _tokenGenerator.GenerateAccessToken(user.Id, user.Email, userClaims);
            var role = userClaims.Find(c => c.Type == ClaimTypes.Role)!.Value;

            return AuthenticationResult.LoginResult(token, user.Id, user.FullName!, user.Email, role, infoObject: infoObject!);
        }

        /// <summary>
        ///
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public async Task<RefreshToken> GenerateAndSaveRefreshToken(ApplicationUser user)
        {
            var result = await _tokenGenerator.GenerateRefreshToken();
            user.RefreshToken = result.Token;
            user.RefreshTokenExpiryInDays = result.Expiry;
            await _userManager.UpdateAsync(user);
            return result;
        }

        public async Task<AuthenticationResult> ValidateAndUpdateRefreshToken(string accessToken, string refreshToken)
        {
            var principal = _tokenGenerator.GetPrincipalFromExpiredToken(accessToken);
            if (principal == null)
            {
                return AuthenticationResult.Fail("Invalid access token or refresh token.");
            }

            string username = principal.Claims.FirstOrDefault(m => m.Type == "sub").Value;
            var user = await _userManager.FindByIdAsync(username);
            if (user == null || user.RefreshToken != refreshToken || user.RefreshTokenExpiryInDays <= DateTime.Now)
            {
                return AuthenticationResult.Fail("Invalid access token or refresh token");
            }

            var role = principal.Claims.FirstOrDefault(c => c.Type == "role");
            var newAccessToken = await _tokenGenerator.GenerateAccessToken(user.Id, user.Email, new List<Claim> { role });
            var newRefreshToken = await _tokenGenerator.GenerateRefreshToken();
            user.RefreshToken = newRefreshToken.Token;
            user.RefreshTokenExpiryInDays = newRefreshToken.Expiry;
            await _userManager.UpdateAsync(user);

            return AuthenticationResult.TokenResult(user.FullName, user.Email, role?.Value, newAccessToken.Token, newRefreshToken.Token);
        }

        /// <summary>
        /// Set user password
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        public virtual async Task<AuthenticationResult> SetUserPassword(string userId, string password)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return AuthenticationResult.Fail("Information is not correct.");
            }
            var result = await _userManager.AddPasswordAsync(user, password);
            if (result.Succeeded)
            {
                return new AuthenticationResult()
                {
                    Success = true,
                    Message = "User registered successfully.",
                    UserInfo = new UserInfo() { UserId = user.Id }
                };
            }

            return AuthenticationResult.Fail(
               result.Errors.FirstOrDefault() != null
                   ? result.Errors.FirstOrDefault()!.Description
                   : "failed to register a user");
        }
    }
}