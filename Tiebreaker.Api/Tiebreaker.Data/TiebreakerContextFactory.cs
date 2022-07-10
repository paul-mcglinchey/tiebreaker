﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Tiebreaker.Data
{
    public class TiebreakerContextFactory : IDesignTimeDbContextFactory<TiebreakerContext>
    {
        public TiebreakerContext CreateDbContext(string[] args)
        {
            var connectionString = args.Any() ? args[0] : Environment.GetEnvironmentVariable("TiebreakerConnectionString") ?? string.Empty;
            var optionsBuilder = new DbContextOptionsBuilder<TiebreakerContext>();
            optionsBuilder.UseSqlServer(connectionString, options => options.MigrationsAssembly("Tiebreaker.Data"));
            return new TiebreakerContext(optionsBuilder.Options);
        }
    }
}
