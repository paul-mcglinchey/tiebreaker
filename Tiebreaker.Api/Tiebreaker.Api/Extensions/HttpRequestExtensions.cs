using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace Tiebreaker.Api.Extensions
{
    public static class HttpRequestExtensions
    {
        internal const string AuthCookieName = "UserAuth";

        public static bool TryGetAuthCookie(this HttpRequest httpRequest, out string cookie) => httpRequest.Cookies.TryGetValue(AuthCookieName, out cookie);

        public static bool TryGetAuthHeader(this HttpRequest httpRequest, out string authHeader) {
            httpRequest.Headers.TryGetValue("authorization", out var authHeaders);

            if (authHeaders.ToString().Split(",").Length == 0)
            {
                authHeader = null;
                return false;
            }

            authHeader = new List<string>(authHeaders.ToString().Split(",")).Find(header => header.Contains("Bearer"));

            if (authHeader != null && authHeader.Split(" ").Length == 2)
            {
                authHeader = authHeader.Split(" ")[1];
            }
            else
            {
                authHeader = null;
            }

            return authHeader is not null;
        }
    }
}
