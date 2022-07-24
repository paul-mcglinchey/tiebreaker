using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Tiebreaker.Api.Models;
using Tiebreaker.Domain.Models;

namespace Tiebreaker.Api.Services.Interfaces
{
    public interface IGroupService
    {
        public Task<List<GroupDto>> GetGroupsAsync(CancellationToken cancellationToken);

        public Task<List<GroupDto>> GetPendingGroupsAsync(CancellationToken cancellationToken);

        public Task<Guid> CreateGroupAsync(Group group, CancellationToken cancellationToken);

        public Task<Guid> UpdateGroupAsync(Guid groupId, Group group, CancellationToken cancellationToken);

        public Task<Guid> DeleteGroupAsync(Guid groupId, CancellationToken cancellationToken);

        public Task<bool> GroupNameExistsAsync(string groupName, CancellationToken cancellationToken);

        public Task<bool> GroupNameExistsAsync(Guid groupId, string groupName, CancellationToken cancellationToken);
    }
}
