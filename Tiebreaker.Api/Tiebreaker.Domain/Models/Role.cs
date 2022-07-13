namespace Tiebreaker.Domain.Models
{
    public class Role
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public virtual ICollection<Application> Applications { get; set; }

        public virtual ICollection<Permission> Permissions { get; set; }

        public virtual ICollection<GroupUser> GroupUsers { get; set; }

        public virtual ICollection<GroupUserApplication> GroupUserApplications { get; set; }
    }
}
