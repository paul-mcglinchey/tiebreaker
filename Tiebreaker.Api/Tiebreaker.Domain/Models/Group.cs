namespace Tiebreaker.Domain.Models
{
    public class Group
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string? Description { get; set; }

        public string? Colour { get; set; }

        public virtual ICollection<Application> Applications { get; set; } = new List<Application>();

        public virtual ICollection<GroupUser> GroupUsers { get; set; } = new List<GroupUser>();
    }
}
