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
    public class GroupService : IGroupService
    {
        private IUserContextProvider userContextProvider;
        private TiebreakerContext context;
        private IMapper mapper;

        public GroupService(IUserContextProvider userContextProvider, TiebreakerContext context, IMapper mapper)
        {
            this.userContextProvider = userContextProvider;
            this.context = context;
            this.mapper = mapper;
        }

        public async Task<List<GroupDto>> GetGroupsAsync(CancellationToken cancellationToken)
        {
            var groups = await this.context.Groups
                .Where(g => g.GroupUsers.Any(gu => gu.UserId == this.userContextProvider.UserId))
                .Include(g => g.Applications)
                .Include(g => g.GroupUsers)
                    .ThenInclude(gu => gu.Roles)
                        .ThenInclude(r => r.Permissions)
                    .ThenInclude(gu => gu.Applications)
                .ToListAsync(cancellationToken);

            return this.mapper.Map<List<Group>, List<GroupDto>>(groups);
        }

        public async Task<List<GroupDto>> GetPendingGroupsAsync(CancellationToken cancellationToken)
        {
            var groups = await this.context.Groups
                .Where(g => g.GroupUsers.Any(gu => gu.UserId.Equals(this.userContextProvider.UserId) && !gu.HasJoined))
                .Include(g => g.Applications)
                .Include(g => g.GroupUsers)
                    .ThenInclude(gu => gu.Roles)
                        .ThenInclude(r => r.Permissions)
                    .ThenInclude(gu => gu.Applications)
                .ToListAsync(cancellationToken);

            return this.mapper.Map<List<Group>, List<GroupDto>>(groups);
        }

        public async Task<Guid> CreateGroupAsync(Group group, CancellationToken cancellationToken)
        {
            var currentUser = await this.context.Users
                        .Where(u => u.Id == this.userContextProvider.UserId)
                        .SingleOrDefaultAsync(cancellationToken);

            var rolesToAdd = await this.context.Roles
                .Where(r => r.Permissions.Any(p => p.Applications.Count == 0))
                .ToListAsync(cancellationToken);

            group.GroupUsers.Add(new GroupUser { User = currentUser, Roles = rolesToAdd });

            this.context.Groups.Add(group);
            await this.context.SaveChangesAsync(cancellationToken);

            return group.Id;
        }

        public async Task<Guid> UpdateGroupAsync(Guid groupId, Group group, CancellationToken cancellationToken)
        {
            var groupToUpdate = await this.context.Groups.Where(g => g.Id == groupId).SingleOrDefaultAsync(cancellationToken);

            groupToUpdate.Name = group.Name;
            groupToUpdate.Description = group.Description;
            groupToUpdate.Colour = group.Colour;

            await this.context.SaveChangesAsync(cancellationToken);

            return groupToUpdate.Id;
        }

        public async Task<Guid> DeleteGroupAsync(Guid groupId, CancellationToken cancellationToken)
        {
            var group = await this.context.Groups.Where(g => g.Id == groupId).SingleOrDefaultAsync(cancellationToken);
            this.context.Groups.Remove(group);
            await this.context.SaveChangesAsync(cancellationToken);

            return group.Id;
        }

        public async Task<bool> GroupNameExistsAsync(string groupName, CancellationToken cancellationToken)
        {
            return await this.context.Groups.Where(g => g.Name.Equals(groupName)).SingleOrDefaultAsync(cancellationToken) != null;
        }

        public async Task<bool> GroupNameExistsAsync(Guid groupId, string groupName, CancellationToken cancellationToken)
        {
            return await this.context.Groups.Where(g => !g.Id.Equals(groupId) && g.Name.Equals(groupName)).SingleOrDefaultAsync(cancellationToken) != null;
        }
    }
}
