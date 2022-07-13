﻿using System;

namespace Tiebreaker.Api.Models
{
    public class UserDto
    {
        public Guid UserId { get; set; }

        public string? Username { get; set; }

        public string? Email { get; set; }

        public bool? IsAdmin { get; set; }

        public string? Token { get; set; }

        public Guid? DefaultGroup { get; set; }
    }
}
