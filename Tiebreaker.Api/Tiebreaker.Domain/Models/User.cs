namespace Tiebreaker.Domain.Models
{
    public class User
    {
        public Guid Id { get; set; }

        public string Username { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public bool IsAdmin { get; set; } = false;

        public Preferences Preferences { get; set; } = new Preferences();
    }

    public class Preferences
    {
        public Guid Id { get; set; }

        public Guid DefaultGroup { get; set; }
    }
}
