using Common.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Security.Interfaces;
using Security.Models;
using Security.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using DAL.Entities;

namespace Security.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static void AddIdentity<TContext>(this IServiceCollection services, IConfiguration configuration)
            where TContext : DbContext
        {
            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();

            services.AddIdentity<ApplicationUser, IdentityRole>(options =>
            {
                options.Password.RequireLowercase = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireDigit = false;
            })
                .AddEntityFrameworkStores<TContext>()
                .AddDefaultTokenProviders();

            services.Configure<IdentityOptions>(options =>
            {
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
                options.Lockout.MaxFailedAccessAttempts = 3;
                options.Lockout.AllowedForNewUsers = true;
            });

            services.Configure<DataProtectionTokenProviderOptions>(options => options.TokenLifespan = TimeSpan.FromMinutes(20));

            // Authentication Bearer Token
            services.AddTransient<IJwtTokenService, JwtTokenService>();
            services.Configure<TokenProviderOptions>(options => configuration.GetSection("IdentityServer:JWT").Bind(options));
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["IdentityServer:JWT:secret"] ?? ""));
            var signingCreds = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var tokenValidationParams = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidIssuer = configuration["IdentityServer:JWT:issuer"],

                ValidateAudience = true,
                ValidAudience = configuration["IdentityServer:JWT:audience"],

                ValidateIssuerSigningKey = true,
                IssuerSigningKey = signingCreds.Key,

                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero
            };
            services.AddAuthentication(config =>
            {
                config.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                config.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                config.DefaultSignInScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = tokenValidationParams;
                });
        }
    }
}