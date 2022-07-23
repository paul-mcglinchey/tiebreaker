namespace Tiebreaker.Domain.Models
{
    public class GroupUserApplication
    {
        public Guid Id { get; set; }

        public Guid GroupUserId { get; set; }

        public GroupUser GroupUser { get; set; }

        public int ApplicationId { get; set; }

        public Application Application { get; set; }

        public virtual ICollection<Role> Roles { get; set; }
    }
}
