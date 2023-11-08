using BLL.Interfaces;
using BLL.Services;
using DAL.Data;
using DAL.Interfaces;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;
using System.Net;
using System.Text.Json.Serialization;
using BLL.ChatHub;
using PL.Mappers;
using Common.Utilities;
using PL.Controllers;
using Security.Interfaces;
using Security.Services;
using PL.Strategies.Interfaces;
using PL.Strategies.Services;
using PL.Utility;
using Security.Extensions;
using Microsoft.AspNetCore.Identity;
using DAL.Entities;
using System.Security.Claims;
using BLL.Models.Email;

namespace PL
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            _ = services.AddMvc().AddControllersAsServices();            
            services.AddDbContext<YomContext>(options => options.UseSqlServer(Configuration.GetConnectionString("YomDatabase")));

            // Adding Identity
            services.AddIdentity<YomContext>(Configuration);
            _ = services.AddControllers();
            _ = services.AddRazorPages();
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IAdService, AdService>();
            services.AddScoped<ICategoryService, CategoryService>();
            services.AddScoped<ISubCategoryService, SubCategoryService>();
            services.AddScoped<IPhotoDirectoryService, PhotoDirectoryService>();
            services.AddScoped<IPhotoService, PhotoService>();
            services.AddScoped<IFavoriteService, FavoriteService>();
            services.AddScoped<IUserReviewService, UserReviewService>();
            services.AddScoped<IUserHelpReportService, UserHelpReportService>();
            services.AddScoped<ILastViewedService, LastViewedService>();
            services.AddScoped<IPurchaseService, PurchaseService>();
            services.AddScoped<IBannerService, BannerService>();
            services.AddScoped<IPaymentService, PaymentService>();


            services.AddTransient<AdminPurchaseController>();
            services.AddTransient<AdminBannerController>();
            services.AddTransient<BannerController>();
            services.AddTransient<SubCategoryController>();
            services.AddTransient<CategoryController>();
            services.AddScoped<IConversationService, ConversationService>();
            services.AddTransient<AdminPurchaseController>();
            services.AddTransient<AdminBannerController>();
            services.AddTransient<BannerController>();
            services.AddSignalR();
            services.AddScoped<ChatHub>();
            services.AddScoped<IMessageService, MessageService>();

            services.AddScoped<IApplicationUserService, ApplicationUserService>();
            services.AddScoped<ISecurityService, SecurityService>();
            services.AddScoped<IJwtTokenService, JwtTokenService>();
            services.AddScoped<ILoginStrategy, ApplicationUserLoginStrategy>();
            services.AddScoped<ILoginStrategyExecuter, LoginStrategy>();


            var emailSettings = Configuration.GetSection("EmailSettings").Get<EmailSettings>();
            services.AddSingleton(emailSettings);
            services.AddScoped<IEmailService, EmailService>();

            services.Configure<IdentityOptions>(options =>
            {
                options.Password.RequireDigit = true;
                options.Password.RequiredLength = 8;
                options.Password.RequireLowercase = true;
                options.Password.RequireUppercase = true; 
                options.Password.RequireNonAlphanumeric = true;
            });


            // Mappers
            services.AddAutoMapper(typeof(AutoMapperProfile));
            services.AddAutoMapper(typeof(BLL.Mappers.AutoMapperProfile));
            services.AddAutoMapper(typeof(BLL.Mappers.ChatMapperProfile));
            services.AddAutoMapper(typeof(BLL.Mappers.UserReviewMapperProfile));
            //services.AddScoped<IAdMapper, AdMapper>();
            //services.AddScoped<IUserMapper, UserMapper>();

            services.AddSwaggerGen(option =>
            {
                option.SwaggerDoc("v1", new OpenApiInfo { Title = "Appruvr API" });
                option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    In = ParameterLocation.Header,
                    Description = "Please enter a valid token",
                    Name = "Authorization",
                    Type = SecuritySchemeType.Http,
                    BearerFormat = "JWT",
                    Scheme = "Bearer"
                });
                option.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type=ReferenceType.SecurityScheme,
                                Id="Bearer"
                            }
                        },
                        Array.Empty<string>()
                    }
                });
            });

            services.AddAuthorization(options =>
            {
                options.AddPolicy(Roles.ADMIN, policy => policy.RequireClaim(ClaimValues.Role, Roles.ADMIN));
                options.AddPolicy(Roles.USER, policy => policy.RequireClaim(ClaimValues.Role, Roles.USER));
            });

            // CORS settings
            services.AddCors(options =>
            {
                options.AddPolicy("MyPolicy",
                    builder =>
                    {
                        // Replace a url on our frontend host
                        // If not, chat won't work
                        builder.WithOrigins("http://localhost:3000")
                            .AllowAnyMethod()
                            .AllowAnyHeader()
                            .AllowCredentials();
                    });
            });

            services.AddControllers().AddJsonOptions(options =>
                options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()));
            services.AddLogging();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IServiceProvider serviceProvider)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler(builder =>
                {
                    builder.Run(async context =>
                    {
                        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                        context.Response.ContentType = "application/json";

                        var error = context.Features.Get<IExceptionHandlerFeature>();
                        if (error != null)
                        {
                            await context.Response.WriteAsync(JsonConvert.SerializeObject(new
                            {
                                error = error.Error.Message,
                                stackTrace = error.Error.StackTrace
                            }));
                        }
                    });
                });
                app.UseHsts();
            }

            var directory = Path.GetDirectoryName(Directory.GetCurrentDirectory());
            var currentDirectory = Path.GetFullPath(Path.Combine(directory!, "DAL", "Photos"));

            env.WebRootPath = Path.GetFullPath(currentDirectory);
            app.UseStaticFiles();
            _ = app.UseHttpsRedirection();
            _ = app.UseStaticFiles();
           
            _ = app.UseRouting();
            _ = app.UseCors("MyPolicy"); // adding CORS
            _ = app.UseAuthentication(); // adding authentication
            _ = app.UseAuthorization(); // adding authorization
            
            app.UseSwagger();
            app.UseSwaggerUI(c => { c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1"); });

            app.UseEndpoints(endpoints =>
            { 
                _ = endpoints.MapControllers();
                endpoints.MapControllers();
                endpoints.MapHub<ChatHub>("/ChatHub");
            });

            SeedAdmin(serviceProvider).Wait();
        }

        private static async Task SeedAdmin(IServiceProvider serviceProvider)
        {
            var _userManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();

            var user = await _userManager.FindByEmailAsync("admin@yom.com");
            if (user == null)
            {
                var admin = new ApplicationUser
                {
                    Email = "admin@yom.com",
                    EmailConfirmed = true,
                    UserName = "NewAdmin",
                    FullName = "Admin"
                };

                var existingAdminUser = await _userManager.FindByEmailAsync(admin.Email);
                if (existingAdminUser == null)
                {
                    IdentityResult result = await _userManager.CreateAsync(admin, "User123!@#");
                    if (result.Succeeded)
                    {
                        await _userManager.AddClaimAsync(admin, new Claim(ClaimTypes.Role, Roles.ADMIN));
                    }
                }
            }
        }
    }
}
