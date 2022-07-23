using System;

namespace Tiebreaker.Api.Models
{
    public class GroupDto
    {
        public Guid? Id { get; set; }

        public string? Name { get; set; }

        public string? Description { get; set; }

        public string? Colour { get; set; }

        public ApplicationDto[] Applications { get; set; }

        public GroupUserDto[] GroupUsers { get; set; }
    }
}
