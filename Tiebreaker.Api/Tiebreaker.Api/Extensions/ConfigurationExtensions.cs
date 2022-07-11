using Microsoft.Extensions.Configuration;
using System;

namespace Tiebreaker.Api.Extensions
{
    public static class ConfigurationExtensions
    {
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
