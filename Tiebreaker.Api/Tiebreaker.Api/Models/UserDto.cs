using System;

namespace Tiebreaker.Api.Models
{
    public class UserDto
    {
        public Guid Id { get; set; }

        public string? Username { get; set; }

        public string? Email { get; set; }

        public string? UsernameOrEmail { get; set; }

        public string? Password { get; set; }

        public bool? IsAdmin { get; set; }

        public string? Token { get; set; }

        public PreferencesDto? Preferences { get; set; }
    }

    public class PreferencesDto
    {
        public Guid Id { get; set; }

        public Guid DefaultGroup { get; set; }
    }
}
