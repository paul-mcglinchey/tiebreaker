namespace Tiebreaker.Domain.Models
{
    public class GroupUser
    {
        public Guid Id { get; set; }

        public Guid GroupId { get; set; }

        public Guid UserId { get; set; }

        public virtual ICollection<Role> Roles { get; set; }
    }
}
