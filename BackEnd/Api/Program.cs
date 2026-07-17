using Hangfire;
using Microsoft.IdentityModel.Tokens;
using OnlineShop.Infrastructure;
using System.Text;
using System.Threading.RateLimiting;
using Microsoft.OpenApi;
using Microsoft.AspNetCore.HttpOverrides;
using OnlineShop.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Api
{
    public interface IDataInitializer
    {
        void InitializeData();
    }//از این استفاده کن برای این که seed data بزنی

    public static class helper
    {
        public static IApplicationBuilder IntializeDatabase(this IApplicationBuilder app)
        {

            using var scope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope();
            var dbContext = scope.ServiceProvider.GetService<AppDbContext>();

            if (dbContext is null)
                return app;

            var pendingMigrations = dbContext.Database.GetPendingMigrations();
            if (pendingMigrations.Any())
                dbContext.Database.Migrate();
            else
                dbContext.Database.EnsureCreated();

            var dataInitializers = scope.ServiceProvider.GetServices<IDataInitializer>();
            foreach (var dataInitializer in dataInitializers)
                dataInitializer.InitializeData();

            return app;
        }
    }
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(c =>
            {
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Name = "Authorization",
                    Type = SecuritySchemeType.Http,
                    Scheme = "Bearer",
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    Description = "لطفاً توکن JWT را اینجا وارد کنید. مثال: Bearer {token}"
                });

                c.AddSecurityRequirement(document => new OpenApiSecurityRequirement
                {
                    [new OpenApiSecuritySchemeReference("Bearer", document)] = new List<string>()
                });
            });
            builder.Services.AddInfrastructure(builder.Configuration);
            builder.Services.AddHealthChecks();
            builder.Services.Configure<ForwardedHeadersOptions>(options =>
                {
                    options.ForwardedHeaders =
                        ForwardedHeaders.XForwardedFor |
                        ForwardedHeaders.XForwardedProto |
                        ForwardedHeaders.XForwardedHost;

                    // چون Nginx داخل Docker است
                    options.KnownNetworks.Clear();
                    options.KnownProxies.Clear();
                });
            var assemblies = AppDomain.CurrentDomain.GetAssemblies()
                .Where(a => a.GetName().Name.Contains("Application"))
                .ToArray();
            builder.Services.AddMediatR(cfg =>
            {
                cfg.RegisterServicesFromAssemblies(assemblies);
            });
            builder.Services.AddRateLimiter(options =>
            {
                options.GlobalLimiter = PartitionedRateLimiter.Create<HttpContext, string>(context =>
                {
                    var ip = context.Connection.RemoteIpAddress?.ToString() ?? "unknown";
                    return RateLimitPartition.GetFixedWindowLimiter(ip, _ => new FixedWindowRateLimiterOptions
                    {
                        PermitLimit = 100,
                        Window = TimeSpan.FromMinutes(1),
                        QueueLimit = 5
                    });
                });
            });


            builder.Services.AddAuthentication("Bearer")
                .AddJwtBearer(opt =>
                {
                    opt.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ClockSkew = TimeSpan.Zero,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = builder.Configuration["Jwt:Issuer"],
                        ValidAudience = builder.Configuration["Jwt:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
                    };
                });
            builder.Services.AddAuthorization(options =>
            {
                options.AddPolicy("AdminOnly", policy => policy.RequireRole("Admin"));
                options.AddPolicy("StoreManagerOnly", policy => policy.RequireRole("StoreManager"));
                options.AddPolicy("Customer", policy => policy.RequireRole("Customer"));

            });
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowFrontend",
                    policy =>
                    {
                        policy.WithOrigins(
                "http://localhost:3000",
                "http://localhost:3001"
            )
                              .AllowAnyHeader()
                              .AllowAnyMethod()
                              .AllowCredentials();
                    });
            });





            var app = builder.Build();
app.UseForwardedHeaders();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
                app.UseCors("AllowFrontend");
            }
            app.IntializeDatabase();
            app.UseStaticFiles();
            app.UseMiddleware<BlacklistMiddleware>();
            app.UseMiddleware<WhitelistMiddleware>();
            app.UseMiddleware<SuspiciousClientMiddleware>();
            app.UseRateLimiter();
            if (app.Environment.IsDevelopment())
            {
                app.UseHttpsRedirection();
            }
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseHangfireDashboard();
            app.MapHealthChecks("/health");
            app.MapControllers();
            app.Run();
        }
    }
}
