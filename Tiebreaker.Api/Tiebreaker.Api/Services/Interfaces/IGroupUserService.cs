using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Tiebreaker.Api.Models;
using Tiebreaker.Domain.Models;

namespace Tiebreaker.Api.Services.Interfaces
{
    public interface IGroupUserService
    {
        public Task<GroupUser?> GetGroupUserAsync(Guid groupId, Guid userId, CancellationToken cancellationToken);

        public Task<bool> GroupUserExistsAsync(Guid groupId, Guid userId, CancellationToken cancellationToken);

        public Task<ListResponse<UserDto>> GetGroupUsersAsync(Guid groupId, CancellationToken cancellationToken);

        public Task<Guid> AddUserAsync(Guid groupId, Guid userId, CancellationToken cancellationToken);

        public Task<Guid> UpdateUserRolesAsync(Guid groupId, Guid userId, List<Role> newRoles, CancellationToken cancellationToken);

        public Task<Guid> DeleteUserAsync(Guid groupId, Guid userId, CancellationToken cancellationToken);

        public Task<Guid?> JoinGroupAsync(Guid groupId, CancellationToken cancellationToken);

        public Task<Guid?> LeaveGroupAsync(Guid groupId, CancellationToken cancellationToken);
    }
}
