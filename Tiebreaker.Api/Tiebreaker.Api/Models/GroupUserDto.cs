using System;

namespace Tiebreaker.Api.Models
{
    public class GroupUserDto
    {
        public Guid? Id { get; set; }

        public Guid? UserId { get; set; }

        public RoleDto[] Roles { get; set; }

        public GroupUserApplicationDto[] Applications { get; set; }
    }
}
