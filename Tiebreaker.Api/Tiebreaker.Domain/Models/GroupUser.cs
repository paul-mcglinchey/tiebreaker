namespace Tiebreaker.Domain.Models
{
    public class GroupUser
    {
        public Guid Id { get; set; }

        public Guid GroupId { get; set; }

        public Group Group { get; set; }

        public Guid UserId { get; set; }

        public User User { get; set; }

        public virtual ICollection<Role> Roles { get; set; } = new List<Role>();

        public virtual ICollection<GroupUserApplication> Applications { get; set; } = new List<GroupUserApplication>();
    }
}
