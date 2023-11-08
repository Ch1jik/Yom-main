using BLL.Interfaces;
using BLL.Models.Email;
using Common.Utilities;
using DAL.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PL.Models;
using PL.Models.User;
using PL.Strategies.Interfaces;
using Security.Interfaces;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;

namespace PL.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : Controller
    {
        private readonly ISecurityService _securityService;
        private readonly ILoginStrategyExecuter _loginStrategy;
        private readonly IApplicationUserService _applicationUserService;
        private readonly IEmailService _emailService;
        private readonly Microsoft.AspNetCore.Identity.UserManager<ApplicationUser> _userManager;

        public AccountController(
            ISecurityService securityService,
            ILoginStrategyExecuter loginStrategy,
            IApplicationUserService applicationUserService,
            IEmailService emailService, Microsoft.AspNetCore.Identity.UserManager<ApplicationUser> userManager)
        {
            _securityService = securityService;
            _loginStrategy = loginStrategy;
            _applicationUserService = applicationUserService;
            _emailService = emailService;
            _userManager = userManager;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            var user = await _applicationUserService.GetByEmail(model.Email);
            if (user != null)
            {
                return Conflict("This email address is already in use.");
            }

            var result = await _securityService.CreateUser(model.FullName, model.Login, model.Email, model.Password, true, Roles.USER);
            if (!result.Success)
            {
                return BadRequest(result.Message);
            }

            var message = new Message(new[] { model.Email }, "Registration Success", $"Hi {model.FullName}!\nYour registration was successful!");

            try
            {
                await _emailService.SendEmailAsync(message);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
            

            var login = new LoginModel() { Email = model.Email, Password = model.Password };
            return await Login(login);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            var errorMessage = "Your email and password do not match.";
            var loginResponse = await _securityService.Login(model.Email, model.Password);
            if (!loginResponse.Success)
                return Unauthorized(loginResponse.Message);

            var user = loginResponse.User;
            var role = loginResponse.UserClaims.Find(c => c.Type == ClaimTypes.Role)!.Value;
            var loginStrategy = await _loginStrategy.Execute(new Strategies.Models.LoginParams
            {
                Role = role,
                ErrorMessage = errorMessage,
                LoginModel = model,
                ApplicationUserService = _applicationUserService
            });
            if (loginStrategy.ResultModel != null && !loginStrategy.ResultModel.success)
                return Unauthorized(loginStrategy.ResultModel);

            var accessTokenResponse = await _securityService.GetAccessToken(user, loginResponse.UserClaims, loginStrategy.Claims);
            var refreshTokenResponse = await _securityService.GenerateAndSaveRefreshToken(user);
            var response = new
            {
                accessTokenResponse.Tokens.AccessToken,
                RefreshToken = refreshTokenResponse.Token,
                accessTokenResponse.UserInfo.Name,
                accessTokenResponse.UserInfo.Email,
                accessTokenResponse.UserInfo.Role,
                loginStrategy.UserId
            };
            return Ok(response);
        }

        [HttpPost]
        [Route("refresh-token")]
        public async Task<IActionResult> RefreshToken(TokenModel tokenModel)
        {
            var result = await _securityService.ValidateAndUpdateRefreshToken(tokenModel.AccessToken, tokenModel.RefreshToken);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            var response = new
            {
                result.UserInfo.Name,
                result.UserInfo.Email,
                result.Tokens.AccessToken,
                result.Tokens.RefreshToken
            };
            return Ok(response);
        }

        [AllowAnonymous]
        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPasswordEndPoint([FromBody] ForgotPasswordModel forgotPasswordModel)
        {
            var user = await _userManager.FindByEmailAsync(forgotPasswordModel.Email);
            if (user != null)
            {
                var token = await _userManager.GeneratePasswordResetTokenAsync(user);
                var recoveryLink = $"http://localhost:3000/reset-password?token={token}&email={forgotPasswordModel.Email}";
                var message = new Message(new string[] { user.Email! }, "Forgot password link", recoveryLink!);
                await _emailService.SendEmailAsync(message);
                return StatusCode(StatusCodes.Status200OK,
                    $"We have sent an email to your inbox {forgotPasswordModel.Email} with a link to reset your password. Please, check your email inbox");
            }
            return BadRequest($"User with this e-mail address {forgotPasswordModel.Email} has not been found");
        }

        [HttpPost("reset-password-email")]
        public async Task<IActionResult> ResetPasswordByEmail([FromBody] PasswordResetModel passwordResetModel)
        {
            var user = await _userManager.FindByEmailAsync(passwordResetModel.Email);
            if (user != null)
            {
                var resetPasswordResult = await _userManager.ResetPasswordAsync(user, passwordResetModel.Token, passwordResetModel.NewPassword);
                if (!resetPasswordResult.Succeeded)
                {
                    foreach (var error in resetPasswordResult.Errors)
                    {
                        ModelState.AddModelError(error.Code, error.Description);
                    }
                    return BadRequest(ModelState);
                }

                return StatusCode(StatusCodes.Status200OK, $"{user.UserName} password has been changed");
            }
            return BadRequest("Couldn't change password, please try again");
        }

        [HttpPost("reset-password")]
        public IActionResult ResetPassword(string token, string email)
        {
            var model = new PasswordResetModel { Token = token, Email = email };
            return Ok(model);
        }

        [HttpDelete("self-profile")]
        public async Task<IActionResult> DeleteSelfProfile()
        {
            var userId = User.Identities.FirstOrDefault().Claims.FirstOrDefault().Value;
            try
            {
                await _applicationUserService.DeleteById(userId);
                return Ok("Success");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}