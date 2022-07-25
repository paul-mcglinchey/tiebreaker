using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Tiebreaker.Api.AccessControl.Interfaces;
using Tiebreaker.Api.Models;
using Tiebreaker.Api.Services.Interfaces;
using Tiebreaker.Data;
using Tiebreaker.Domain.Models;

namespace Tiebreaker.Api.Services
{
    public class RoleService : IRoleService
    {
        private IUserContextProvider userContextProvider;
        private TiebreakerContext context;
        private IMapper mapper;

        public RoleService(IUserContextProvider userContextProvider, TiebreakerContext context, IMapper mapper)
        {
            this.userContextProvider = userContextProvider;
            this.context = context;
            this.mapper = mapper;
        }

        public async Task<List<RoleDto>> GetRolesAsync(CancellationToken cancellationToken)
        {
            var roles = await this.context.Roles
                .Where(r => r.Group == null)
                .ToListAsync(cancellationToken);

            return this.mapper.Map<List<Role>, List<RoleDto>>(roles);
        }

        public async Task<List<RoleDto>> GetRolesAsync(Guid groupId, CancellationToken cancellationToken)
        {
            var roles = await this.context.Roles
                .Where(r => r.Group == null || r.Group.Id.Equals(groupId))
                .ToListAsync(cancellationToken);

            return this.mapper.Map<List<Role>, List<RoleDto>>(roles);
        }

        public async Task<Guid> CreateRoleAsync(Guid groupId, Role role, CancellationToken cancellationToken)
        {
            role.GroupId = groupId;

            this.context.Roles.Add(role);
            await this.context.SaveChangesAsync(cancellationToken);

            return role.Id;
        }

        public async Task<Guid> DeleteRoleAsync(Guid roleId, CancellationToken cancellationToken)
        {
            var role = await this.context.Roles.Where(r => r.Id.Equals(roleId)).SingleOrDefaultAsync(cancellationToken);
            this.context.Roles.Remove(role);
            await this.context.SaveChangesAsync(cancellationToken);

            return role.Id;
        }

        public async Task<bool> RoleNameExistsAsync(Guid groupId, string roleName, CancellationToken cancellationToken)
        {
            return await this.context.Roles.Where(r => r.GroupId.Equals(groupId) && r.Name.Equals(roleName)).SingleOrDefaultAsync(cancellationToken) != null;
        }
    }
}
