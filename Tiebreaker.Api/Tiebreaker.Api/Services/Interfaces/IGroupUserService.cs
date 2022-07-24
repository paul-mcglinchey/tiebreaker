using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Tiebreaker.Domain.Models;

namespace Tiebreaker.Api.Services.Interfaces
{
    public interface IGroupUserService
    {
        public Task<GroupUser?> GetGroupUserAsync(Guid groupId, Guid userId, CancellationToken cancellationToken);

        public Task<Guid> InviteUserAsync(Guid groupId, Guid userId, CancellationToken cancellationToken);

        public Task<Guid> KickUserAsync(Guid groupId, Guid userId, CancellationToken cancellationToken);

        public Task<Guid> UpdateUserRolesAsync(Guid groupId, Guid userId, List<Role> newRoles, CancellationToken cancellationToken);

        public Task<Guid?> JoinGroupAsync(Guid groupId, CancellationToken cancellationToken);

        public Task<Guid?> LeaveGroupAsync(Guid groupId, CancellationToken cancellationToken);
    }
}
