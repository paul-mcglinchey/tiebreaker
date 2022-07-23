using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Logging;

namespace Tiebreaker.Data
{
    public class TiebreakerContextFactory : IDesignTimeDbContextFactory<TiebreakerContext>
    {
        public TiebreakerContext CreateDbContext(string[] args)
        {
            var connectionString = args.Any() ? args[0] : Environment.GetEnvironmentVariable("TiebreakerConnectionString") ?? "Server=localhost;Initial Catalog=Tiebreaker;Persist Security Info=False;User ID=tiebreaker;Password=localpassword;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=True;Connection Timeout=30;";
            var optionsBuilder = new DbContextOptionsBuilder<TiebreakerContext>();
            optionsBuilder
                .UseSqlServer(connectionString, options => options.MigrationsAssembly("Tiebreaker.Data"))
                .LogTo(Console.WriteLine, new[] { DbLoggerCategory.Database.Command.Name },
                       LogLevel.Information);

            return new TiebreakerContext(optionsBuilder.Options);
        }
    }
}
