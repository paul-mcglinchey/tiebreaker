using Microsoft.EntityFrameworkCore;
using Tiebreaker.Domain.Models;

namespace Tiebreaker.Data.Extensions
{
    public static class ModelBuilderExtensions
    {
        public static void Seed(this ModelBuilder modelBuilder)
        {
            var groupAdminRoleId = Guid.Parse("1BA0C5A2-00A5-4B37-9E97-CC354AD6D9E2");

            modelBuilder.Entity<Permission>().HasData(
                new Permission
                {
                    Id = 1,
                    Name = "Group Access",
                    Description = "Grants access to a group.",
                    Applications = null
                });

            modelBuilder.Entity<Role>().HasData(
                new Role
                {
                    Id = groupAdminRoleId,
                    Name = "Group Admin",
                    Description = "Intended to be assigned to highest level group members."
                });

            modelBuilder.Entity<RolePermission>().HasData(
                new RolePermission
                {
                    RoleId = groupAdminRoleId,
                    PermissionId = 1
                });
        }
    }
}
