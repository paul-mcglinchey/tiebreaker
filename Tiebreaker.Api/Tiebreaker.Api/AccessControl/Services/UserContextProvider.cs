using System;
using Tiebreaker.Api.AccessControl.Interfaces;

namespace Tiebreaker.Api.AccessControl.Services
{
    internal class UserContextProvider : IUserContextProvider
    {
        private readonly IAuthenticator authenticator;

        public UserContextProvider(IAuthenticator authenticator)
        {
            this.authenticator = authenticator;
        }

        public Guid UserId => this.authenticator.UserId;

    }
}
