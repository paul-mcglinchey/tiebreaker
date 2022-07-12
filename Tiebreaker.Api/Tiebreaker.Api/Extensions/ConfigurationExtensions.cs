using Microsoft.Extensions.Configuration;
using System;
using Tiebreaker.Api.Controllers.Builder;

namespace Tiebreaker.Api.Extensions
{
    public static class ConfigurationExtensions
    {
        public static IConfigurationBuilder ConfigureDefaultApiControllers(this IConfigurationBuilder builder, Type startupType) =>
            builder.ConfigureControllers()
                .WithVersionController(startupType)
                .WithConfigurationController()
                .Build();

        public static IFunctionsControllerBuilder ConfigureControllers(this IConfigurationBuilder builder) =>
            new FunctionsControllerBuilder(builder);

        public static IConfigurationBuilder ConfigureAppConfiguration(this IConfigurationBuilder builder)
        {
            var environmentName = Environment.GetEnvironmentVariable("EnvironmentName");

            return builder.AddAzureAppConfiguration(
                options =>
                {
                    options.Connect(Environment.GetEnvironmentVariable("AppConfigConnectionString"));
                }, true);
        }
    }
}
