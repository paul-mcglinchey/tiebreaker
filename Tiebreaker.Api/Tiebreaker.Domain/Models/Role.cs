namespace Tiebreaker.Domain.Models
{
    public class Role
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public Guid? GroupId { get; set; }

        public Group? Group { get; set; }

        public virtual ICollection<Permission> Permissions { get; set; }

        public virtual ICollection<GroupUser> GroupUsers { get; set; }

        public virtual ICollection<GroupUserApplication> GroupUserApplications { get; set; }
    }
}
