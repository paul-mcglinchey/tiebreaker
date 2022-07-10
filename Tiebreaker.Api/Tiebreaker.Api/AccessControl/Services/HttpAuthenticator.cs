using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Threading.Tasks;
using Tiebreaker.Api.AccessControl.Interfaces;
using Tiebreaker.Api.Extensions;
using Tiebreaker.Data;

namespace Tiebreaker.Api.AccessControl.Services
{
    internal class HttpAuthenticator : IAuthenticator
    {
        private readonly ILogger<HttpAuthenticator> logger;
        private readonly TiebreakerContext context;
        private readonly JwtSecurityTokenHandler handler;
        private readonly IHttpContextAccessor httpContextAccessor;
        private Guid? id;

        public HttpAuthenticator(ILogger<HttpAuthenticator> logger, TiebreakerContext context, JwtSecurityTokenHandler handler, IHttpContextAccessor httpContextAccessor)
        {
            this.logger = logger;
            this.context = context;
            this.handler = handler;
            this.httpContextAccessor = httpContextAccessor;
        }

        public Guid Id => this.id ?? throw new NotSupportedException("User ID cannot be used before authentication");

        public async Task<bool> AuthenticateAsync()
        {
            if (!this.httpContextAccessor.HttpContext.Request.TryGetAuthHeader(out var token))
            {
                return false;
            };

            handler.ValidateToken(token, GetValidationParameters(), out var decoded);

            return token is not null;
        }

        private static TokenValidationParameters GetValidationParameters()
        {
            return new TokenValidationParameters 
            {
                ValidateLifetime = false,
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidIssuer = "Sample",
                ValidAudience = "Sample",
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("localsecret"))
            };

        }
    }
}
