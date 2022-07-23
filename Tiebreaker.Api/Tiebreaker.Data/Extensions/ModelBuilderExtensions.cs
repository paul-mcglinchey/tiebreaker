using Microsoft.EntityFrameworkCore;
using Tiebreaker.Domain.Models;

namespace Tiebreaker.Data.Extensions
{
    public static class ModelBuilderExtensions
    {
        public static void Seed(this ModelBuilder modelBuilder)
        {
            var groupAdminRoleId = Guid.Parse("1BA0C5A2-00A5-4B37-9E97-CC354AD6D9E2");

            modelBuilder.Entity<Application>().HasData(
                new Application
                {
                    Id = 1,
                    Name = "Rota Manager",
                    Description = "A first class environment for managing rotas & employees in your business.",
                    Url = "/rotas/dashboard",
                    BackgroundImage = "https://res.cloudinary.com/pmcglinchey/image/upload/v1656632136/smoulderedsignals_19201080_m0nwwf.png",
                    BackgroundVideo = "https://res.cloudinary.com/pmcglinchey/video/upload/v1656873263/smoulderingsignals_960540_looping_qu42se.mp4",
                    Colour = "#6d28d9",
                },
                new Application
                {
                    Id = 2,
                    Name = "Client Manager",
                    Description = "A complete package for managing clients allowing you to spend more time where it really matters.",
                    Url = "/clients/dashboard",
                    BackgroundImage = "https://res.cloudinary.com/pmcglinchey/image/upload/v1656621688/electricwaves_19201080_ll3sa9.png",
                    BackgroundVideo = "https://res.cloudinary.com/pmcglinchey/video/upload/v1656873057/electricwaves_960540_looping_lczpjp.mp4",
                    Colour = "#e11d48",
                });

            modelBuilder.Entity<Permission>().HasData(
                new Permission
                {
                    Id = 1,
                    Name = "Group Access",
                    Description = "Grants access to a group.",
                },
                new Permission
                {
                    Id = 2,
                    Name = "Group Admin Access",
                    Description = "Grants admin access to a group",
                },
                new Permission
                {
                    Id = 101,
                    Name = "Application Access",
                    Description = "Grants access to an application.",
                });

            modelBuilder.Entity<ApplicationPermission>().HasData(
                new ApplicationPermission
                {
                    ApplicationId = 1,
                    PermissionId = 101,
                },
                new ApplicationPermission
                {
                    ApplicationId = 2,
                    PermissionId = 101,
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
                }, 
                new RolePermission
                {
                    RoleId = groupAdminRoleId,
                    PermissionId = 2
                });
        }
    }
}
