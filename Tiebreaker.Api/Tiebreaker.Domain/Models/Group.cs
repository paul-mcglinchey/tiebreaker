namespace Tiebreaker.Domain.Models
{
    public class Group
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string? Description { get; set; }

        public string? Colour { get; set; }

        public virtual ICollection<Application> Applications { get; set; }

        public virtual ICollection<User> Users { get; set; } = new List<User>();
    }
}
