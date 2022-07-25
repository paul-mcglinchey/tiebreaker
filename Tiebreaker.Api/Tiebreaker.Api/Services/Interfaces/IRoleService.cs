using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Tiebreaker.Api.Models;
using Tiebreaker.Domain.Models;

namespace Tiebreaker.Api.Services.Interfaces
{
    public interface IRoleService
    {
        public Task<List<RoleDto>> GetRolesAsync(CancellationToken cancellationToken);

        public Task<List<RoleDto>> GetRolesAsync(Guid groupId, CancellationToken cancellationToken);

        public Task<bool> RoleNameExistsAsync(Guid groupId, string roleName, CancellationToken cancellationToken);

        public Task<Guid> CreateRoleAsync(Guid groupId, Role role, CancellationToken cancellationToken);

        public Task<Guid> DeleteRoleAsync(Guid roleId, CancellationToken cancellationToken);
    }
}
