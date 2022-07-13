using System.ComponentModel.DataAnnotations.Schema;

namespace Tiebreaker.Domain.Models
{
    public class Audit
    {
        public Guid Id { get; set; }

        [ForeignKey(nameof(User))]
        public Guid CreatedBy { get; set; }

        [ForeignKey(nameof(User))]
        public Guid UpdatedBy { get; set; }
    }
}
