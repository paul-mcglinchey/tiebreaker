using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Tiebreaker.Data;

namespace Tiebreaker.Migator
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var connectionString = args.Any() ? args[0] : GetConfig()["TiebreakerConnectionString"];
            using var context = new TiebreakerContextFactory().CreateDbContext(new[] { connectionString });

            Console.WriteLine($"Starting Migration");
            if (context.Database.CanConnect())
            {
                context.Database.Migrate();
                Console.WriteLine("Migration complete");
            }
            else
            {
                Console.WriteLine("Migration failed");
            }
        }

        public static IConfiguration GetConfig() =>
            new ConfigurationBuilder().AddEnvironmentVariables().Build();
    }
}
