﻿namespace Tiebreaker.Api.Models
{
    public class PermissionDto
    {
        public int? Id { get; set; }

        public string? Name { get; set; }

        public string? Description { get; set; }

        public string? Language { get; set; }

        public ApplicationDto[] Applications { get; set; }
    }
}
