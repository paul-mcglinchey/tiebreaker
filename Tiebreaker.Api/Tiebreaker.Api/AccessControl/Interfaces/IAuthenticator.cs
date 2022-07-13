using System;
using System.Threading.Tasks;

namespace Tiebreaker.Api.AccessControl.Interfaces
{
    public interface IAuthenticator
    {
        public Guid UserId { get; }

        Task<bool> AuthenticateAsync();
    }
}
