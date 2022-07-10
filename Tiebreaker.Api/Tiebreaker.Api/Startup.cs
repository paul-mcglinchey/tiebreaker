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
using Tiebreaker.Data;
using Tiebreaker.Data.Enums;

[assembly: FunctionsStartup(typeof(Startup))]

namespace Tiebreaker.Api
{
    public class Startup : FunctionsStartup
    {
        public override void ConfigureAppConfiguration(IFunctionsConfigurationBuilder builder) => builder.ConfigurationBuilder.ConfigureAppConfiguration();

        public override void Configure(IFunctionsHostBuilder builder)
        {
            builder.Services.AddTransient<IUserAuthorisationService<Permission>, UserAuthorizationService>();

            builder.Services.AddAccessControl<Permission, UserAuthorizationService>();

            this.ConfigureServices(builder, builder.GetContext().Configuration);
            this.ConfigureNewtonsoft();
        }

        private void ConfigureServices(IFunctionsHostBuilder builder, IConfiguration configuration)
        {
            builder.Services.AddSingleton<JwtSecurityTokenHandler>();

            builder.Services.AddDbContext<TiebreakerContext>(options =>
                options.UseSqlServer(configuration["TiebreakerConnectionString"]));
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
                ContractResolver = resolver
            };
        }
    }
}
