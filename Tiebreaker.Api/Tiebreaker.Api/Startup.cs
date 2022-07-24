using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.IdentityModel.Tokens.Jwt;
using Tiebreaker.Api;
using Tiebreaker.Api.AccessControl.Interfaces;
using Tiebreaker.Api.AccessControl.Services;
using Tiebreaker.Api.Extensions;
using Tiebreaker.Api.Services;
using Tiebreaker.Api.Services.Interfaces;
using Tiebreaker.Data;
using Tiebreaker.Data.Enums;

[assembly: FunctionsStartup(typeof(Startup))]

namespace Tiebreaker.Api
{
    public class Startup : FunctionsStartup
    {
        public override void ConfigureAppConfiguration(IFunctionsConfigurationBuilder builder) => builder.ConfigurationBuilder.ConfigureAppConfiguration().ConfigureDefaultApiControllers(typeof(Startup));

        public override void Configure(IFunctionsHostBuilder builder)
        {
            builder.Services.AddTransient<IUserAuthorisationService<PermissionType>, UserAuthorizationService>();

            builder.Services.AddAccessControl<PermissionType, UserAuthorizationService>();

            this.ConfigureServices(builder, builder.GetContext().Configuration);
            this.ConfigureNewtonsoft();
        }

        private void ConfigureServices(IFunctionsHostBuilder builder, IConfiguration configuration)
        {
            builder.Services.AddSingleton<JwtSecurityTokenHandler>();

            builder.Services.AddDbContext<TiebreakerContext>(options =>
                options.UseSqlServer(configuration["TiebreakerConnectionString"]));

            builder.Services.AddTransient<IUserService, UserService>();
            builder.Services.AddTransient<IGroupService, GroupService>();
            builder.Services.AddTransient<IGroupUserService, GroupUserService>();
            builder.Services.AddTransient<IUserContextProvider, UserContextProvider>();

            builder.Services.AddAutoMapper(typeof(Startup));
        }

        private void ConfigureNewtonsoft()
        {
            var resolver = new DefaultContractResolver();
            resolver.NamingStrategy = new CamelCaseNamingStrategy
            {
                ProcessDictionaryKeys = false,
            };

            JsonConvert.DefaultSettings = () => new JsonSerializerSettings
            {
                ContractResolver = resolver,
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
            };
        }
    }
}
