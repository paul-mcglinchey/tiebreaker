using System.Threading;
using System.Threading.Tasks;
using Tiebreaker.Api.Models;

namespace Tiebreaker.Api.Services.Interfaces
{
    public interface IUserService
    {
        public Task<bool> UserExistsAsync(UserRequest user, CancellationToken cancellationToken);

        public Task<UserDto> CreateUserAsync(UserRequest user, CancellationToken cancellationToken);

        public Task<UserDto> AuthenticateUserAsync(UserRequest user, CancellationToken cancellationToken);
    }
}
