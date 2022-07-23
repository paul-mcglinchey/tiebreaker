using AutoMapper;
using Tiebreaker.Domain.Models;

namespace Tiebreaker.Api.Models.Maps
{
    public class TiebreakerMapConfiguration : Profile
    {
        public TiebreakerMapConfiguration()
        {
            this.CreateDTOMaps();
        }

        private void CreateDTOMaps()
        {
            this.CreateMap<User, UserDto>().ReverseMap();
            this.CreateMap<User, UserRequest>().ReverseMap();
            this.CreateMap<Group, GroupDto>().ReverseMap();
            this.CreateMap<Application, ApplicationDto>().ReverseMap();
            this.CreateMap<GroupUser, GroupUserDto>().ReverseMap();
            this.CreateMap<GroupUserApplication, GroupUserApplicationDto>().ReverseMap();
            this.CreateMap<Role, RoleDto>().ReverseMap();
            this.CreateMap<Permission, PermissionDto>().ReverseMap();
        }
    }
}
