using Microsoft.EntityFrameworkCore;
using Tiebreaker.Domain.Models;

namespace Tiebreaker.Data
{
    public class TiebreakerContext : DbContext
    {
        public TiebreakerContext()
        {
        }

        public TiebreakerContext(DbContextOptions<TiebreakerContext> options)
            : base(options) 
        {
        }

        public DbSet<User>? Users { get; set; }
    }
}
