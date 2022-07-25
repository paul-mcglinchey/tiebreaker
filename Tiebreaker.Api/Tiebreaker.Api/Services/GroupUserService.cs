﻿using AutoMapper;
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
    public class GroupUserService : IGroupUserService
    {
        private IUserContextProvider userContextProvider;
        private TiebreakerContext context;
        private IMapper mapper;

        public GroupUserService(IUserContextProvider userContextProvider, TiebreakerContext context, IMapper mapper)
        {
            this.userContextProvider = userContextProvider;
            this.context = context;
            this.mapper = mapper;
        }

        public async Task<GroupUser?> GetGroupUserAsync(Guid groupId, Guid userId, CancellationToken cancellationToken)
        {
            return await this.context.GroupUsers
                .Where(gu => gu.GroupId.Equals(groupId) && gu.UserId.Equals(userId))
                .Include(gu => gu.Roles)
                .SingleOrDefaultAsync(cancellationToken);
        }

        public async Task<bool> GroupUserExistsAsync(Guid groupId, Guid userId, CancellationToken cancellationToken) =>
            await GetGroupUserAsync(groupId, userId, cancellationToken) != null;

        public async Task<ListResponse<UserDto>> GetGroupUsersAsync(Guid groupId, CancellationToken cancellationToken)
        {
            var group = await this.context.Groups
                .Where(g => g.Id.Equals(groupId))
                .Include(g => g.GroupUsers)
                .SingleOrDefaultAsync(cancellationToken);

            var users = await this.context.Users.Where(u => group.GroupUsers.Select(gu => gu.UserId).Contains(u.Id)).ToListAsync(cancellationToken);

            return new ListResponse<UserDto>
            {
                Items = this.mapper.Map<List<UserDto>>(users),
                Count = users.Count,
            };
        }

        public async Task<Guid> AddUserAsync(Guid groupId, Guid userId, CancellationToken cancellationToken)
        {
            var groupUser = new GroupUser { GroupId = groupId, UserId = userId };
            this.context.GroupUsers.Add(groupUser);
            await this.context.SaveChangesAsync(cancellationToken);

            return groupUser.Id;
        }

        public async Task<Guid> DeleteUserAsync(Guid groupId, Guid userId, CancellationToken cancellationToken)
        {
            var groupUser = await GetGroupUserAsync(groupId, userId, cancellationToken);
            this.context.GroupUsers.Remove(groupUser);
            await this.context.SaveChangesAsync(cancellationToken);

            return groupUser.Id;
        }

        public async Task<Guid> UpdateUserRolesAsync(Guid groupId, Guid userId, List<Role> newRoles, CancellationToken cancellationToken)
        {
            var groupUser = await GetGroupUserAsync(groupId, userId, cancellationToken);
            var rolesToAdd = await this.context.Roles.Where(r => newRoles.Select(nr => nr.Id).Contains(r.Id)).ToListAsync(cancellationToken);

            groupUser.Roles = rolesToAdd;
            await this.context.SaveChangesAsync(cancellationToken);

            return groupUser.Id;
        }

        public async Task<Guid?> JoinGroupAsync(Guid groupId, CancellationToken cancellationToken)
        {
            var groupUser = await GetGroupUserAsync(groupId, this.userContextProvider.UserId, cancellationToken);
            groupUser.HasJoined = true;
            await this.context.SaveChangesAsync(cancellationToken);

            return groupUser.Id;
        }

        public async Task<Guid?> LeaveGroupAsync(Guid groupId, CancellationToken cancellationToken)
        {
            var groupUser = await GetGroupUserAsync(groupId, this.userContextProvider.UserId, cancellationToken);
            this.context.GroupUsers.Remove(groupUser);
            await this.context.SaveChangesAsync(cancellationToken);

            return groupUser.Id;
        }
    }
}