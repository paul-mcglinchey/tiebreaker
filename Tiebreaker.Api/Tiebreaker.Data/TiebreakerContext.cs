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

        public DbSet<Application>? Applications { get; set; }

        public DbSet<ApplicationPermission>? ApplicationPermissions { get; set; }

        public DbSet<ApplicationRole>? ApplicationRoles { get; set; }

        public DbSet<Audit>? Audits { get; set; }

        public DbSet<Group>? Groups { get; set; }

        public DbSet<GroupApplication>? GroupApplications { get; set; }

        public DbSet<GroupUser>? GroupUsers { get; set; }

        public DbSet<GroupUserApplication>? GroupUserApplications { get; set; }

        public DbSet<GroupUserApplicationRole>? GroupUserApplicationRoles { get; set; }

        public DbSet<GroupUserRole>? GroupUserRoles { get; set; }

        public DbSet<Permission>? Permissions { get; set; }

        public DbSet<Role>? Roles { get; set; }

        public DbSet<RolePermission>? RolePermissions { get; set; }

        public DbSet<User>? Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Application>()
                .HasMany<Permission>(a => a.Permissions)
                .WithMany(p => p.Applications)
                .UsingEntity<ApplicationPermission>();

            modelBuilder.Entity<Application>()
                .HasMany<Role>(a => a.Roles)
                .WithMany(r => r.Applications)
                .UsingEntity<ApplicationRole>();

            modelBuilder.Entity<Group>()
                .HasMany<Application>(g => g.Applications)
                .WithMany(a => a.Groups)
                .UsingEntity<GroupApplication>();

            modelBuilder.Entity<User>()
                .HasMany<Group>(u => u.Groups)
                .WithMany(g => g.Users)
                .UsingEntity<GroupUser>();

            modelBuilder.Entity<GroupUserApplication>()
                .HasMany<Role>(gua => gua.Roles)
                .WithMany(r => r.GroupUserApplications)
                .UsingEntity<GroupUserApplicationRole>();

            modelBuilder.Entity<GroupUser>()
                .HasMany<Role>(gu => gu.Roles)
                .WithMany(r => r.GroupUsers)
                .UsingEntity<GroupUserRole>();

            modelBuilder.Entity<Role>()
                .HasMany<Permission>(r => r.Permissions)
                .WithMany(p => p.Roles)
                .UsingEntity<RolePermission>();
        }
    }
}
