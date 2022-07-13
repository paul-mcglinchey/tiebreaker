using System.ComponentModel.DataAnnotations.Schema;

namespace Tiebreaker.Domain.Models
{
    public class Application
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string? Description { get; set; }

        public string? Icon { get; set; }

        public string? BackgroundImage { get; set; }

        public string? BackgroundVideo { get; set; }

        public string Url { get; set; }

        public string? Colour { get; set; }

        [ForeignKey(nameof(Audit))]
        public Guid AuditId { get; set; }

        public virtual ICollection<Permission> Permissions { get; set; }

        public virtual ICollection<Role> Roles { get; set; }

        public virtual ICollection<Group> Groups { get; set; }
    }
}
