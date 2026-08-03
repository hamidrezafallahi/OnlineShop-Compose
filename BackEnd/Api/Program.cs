using Api.Security;
using Hangfire;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi;
using OnlineShop.Infrastructure;
using OnlineShop.Infrastructure.Persistence;
using System.Text;
using System.Threading.RateLimiting;

namespace Api
{
    public static class helper
    {
        public static IApplicationBuilder IntializeDatabase(this IApplicationBuilder app)
        {

            using var scope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope();
            var dbContext = scope.ServiceProvider.GetService<AppDbContext>();

            if (dbContext is null)
                return app;

            var pendingMigrations = dbContext.Database.GetPendingMigrations().ToList();
            if (pendingMigrations.Any())
            {
                // Legacy DBs may have been created with EnsureCreated (no __EFMigrationsHistory).
                // Applying the full initial schema migration would fail; skip Migrate in that case.
                var appliedAny = dbContext.Database.GetAppliedMigrations().Any();
                var hasLegacySchema = !appliedAny && TableExists(dbContext, "EntityConfigs");
                if (!hasLegacySchema)
                    dbContext.Database.Migrate();
            }
            else
            {
                dbContext.Database.EnsureCreated();
            }

            var dataInitializers = scope.ServiceProvider.GetServices<IDataInitializer>();
            foreach (var dataInitializer in dataInitializers)
                dataInitializer.InitializeData();

            return app;
        }

        private static bool TableExists(AppDbContext dbContext, string tableName)
        {
            try
            {
                var connection = dbContext.Database.GetDbConnection();
                var shouldClose = connection.State != System.Data.ConnectionState.Open;
                if (shouldClose)
                    connection.Open();

                using var command = connection.CreateCommand();
                command.CommandText =
                    """
                    SELECT EXISTS (
                        SELECT 1
                        FROM information_schema.tables
                        WHERE table_schema = 'public'
                          AND table_name = @tableName
                    );
                    """;
                var parameter = command.CreateParameter();
                parameter.ParameterName = "@tableName";
                parameter.Value = tableName;
                command.Parameters.Add(parameter);

                var result = command.ExecuteScalar();
                if (shouldClose)
                    connection.Close();

                return result is true || result is bool b && b;
            }
            catch
            {
                return false;
            }
        }
    }
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddControllers()
                .AddJsonOptions(options =>
                {
                    // Admin forms historically send numeric inputs as JSON strings.
                    options.JsonSerializerOptions.NumberHandling =
                        System.Text.Json.Serialization.JsonNumberHandling.AllowReadingFromString;
                });
            builder.Services.Configure<Microsoft.AspNetCore.Http.Features.FormOptions>(options =>
            {
                options.MultipartBodyLengthLimit = 52_428_800; // 50 MB
                options.ValueLengthLimit = 52_428_800;
                options.MemoryBufferThreshold = 1024 * 1024;
            });
            builder.WebHost.ConfigureKestrel(options =>
            {
                options.Limits.MaxRequestBodySize = 52_428_800;
            });
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


            var jwtKey = builder.Configuration["Jwt:Key"];
            if (string.IsNullOrWhiteSpace(jwtKey) || jwtKey.Length < 32)
                throw new InvalidOperationException(
                    "Jwt:Key must be set via environment/secrets and be at least 32 characters.");

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
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
                    };
                });
            builder.Services.AddAuthorization(options =>
            {
                options.AddPolicy("AdminOnly", policy => policy.RequireRole("Admin"));
                options.AddPolicy("StoreManagerOnly", policy => policy.RequireRole("StoreManager"));
                options.AddPolicy("Customer", policy => policy.RequireRole("Customer"));

            });
            var allowedOrigins = builder.Configuration
                .GetSection("Cors:AllowedOrigins")
                .Get<string[]>()?
                .Where(origin => !string.IsNullOrWhiteSpace(origin))
                .Distinct(StringComparer.OrdinalIgnoreCase)
                .ToArray() ?? Array.Empty<string>();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowFrontend", policy =>
                {
                    if (allowedOrigins.Length > 0)
                    {
                        policy.WithOrigins(allowedOrigins)
                            .AllowAnyHeader()
                            .AllowAnyMethod()
                            .AllowCredentials();
                    }
                });
            });





            var app = builder.Build();
            app.UseForwardedHeaders();

            var swaggerEnabled = app.Environment.IsDevelopment() ||
                builder.Configuration.GetValue<bool>("Swagger:Enabled");

            if (swaggerEnabled)
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            if (allowedOrigins.Length > 0)
            {
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
            app.UseHangfireDashboard("/hangfire", new DashboardOptions
            {
                Authorization = new[]
                {
                    new HangfireDashboardAuthFilter(app.Environment, app.Configuration)
                }
            });
            app.MapHealthChecks("/health");
            app.MapControllers();
            app.Run();
        }
    }
}
