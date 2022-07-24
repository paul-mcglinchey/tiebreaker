namespace Tiebreaker.Api.Models
{
    public class GroupUserApplicationDto
    {
        public int ApplicationId { get; set; }

        public RoleDto[] Roles { get; set; }
    }
}
