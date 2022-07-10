using System;
using System.Threading.Tasks;

namespace Tiebreaker.Api.AccessControl.Interfaces
{
    public interface IAuthenticator
    {
        public Guid Id { get; }

        Task<bool> AuthenticateAsync();
    }
}
