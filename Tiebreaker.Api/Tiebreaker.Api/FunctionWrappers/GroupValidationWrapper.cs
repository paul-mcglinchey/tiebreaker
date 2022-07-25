using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading;
using System.Threading.Tasks;
using Tiebreaker.Api.AccessControl.Interfaces;
using Tiebreaker.Api.Services.Interfaces;

namespace Tiebreaker.Api.FunctionWrappers
{
    public class GroupValidationWrapper : IGroupValidationWrapper
    {
        private readonly IGroupService groupService;
        private readonly IUserService userService;
        private readonly IGroupUserService groupUserService;
        private readonly IUserContextProvider userContextProvider;

        public GroupValidationWrapper(
            IGroupService groupService,
            IUserService userService,
            IGroupUserService groupUserService,
            IUserContextProvider userContextProvider)
        {
            this.groupService = groupService;
            this.userService = userService;
            this.groupUserService = groupUserService;
            this.userContextProvider = userContextProvider;
        }

        public async Task<ActionResult> Validate(HttpRequest req, Func<Guid, Task<ActionResult>> implementation, CancellationToken cancellationToken)
        {
            if (!req.Query.TryGetValue("groupId", out var groupId))
            {
                return new BadRequestObjectResult("Group ID not supplied in query parameters.");
            }

            return await Validate(groupId, implementation, cancellationToken);
        }

        public async Task<ActionResult> Validate(string groupId, Func<Guid, Task<ActionResult>> implementation, CancellationToken cancellationToken)
        {
            if (!Guid.TryParse(groupId, out var groupIdGuid))
            {
                return new BadRequestObjectResult("Group ID supplied is not a valid GUID.");
            }

            if (!await this.groupService.GroupExistsAsync(groupIdGuid, cancellationToken))
            {
                return new NotFoundObjectResult("Group not found");
            }

            return await implementation(groupIdGuid);
        }

        public async Task<ActionResult> Validate(string groupId, string userId, Func<Guid, Guid, Task<ActionResult>> implementation, CancellationToken cancellationToken)
        {
            if (!Guid.TryParse(groupId, out var groupIdGuid))
            {
                return new BadRequestObjectResult("Group ID supplied is not a valid GUID.");
            }

            if (!await this.groupService.GroupExistsAsync(groupIdGuid, cancellationToken))
            {
                return new NotFoundObjectResult("Group not found");
            }

            if (!Guid.TryParse(userId, out var userIdGuid))
            {
                return new BadRequestObjectResult("User ID supplied is not a valid GUID.");
            }

            if (!await this.userService.UserExistsAsync(userIdGuid, cancellationToken))
            {
                return new NotFoundObjectResult("User not found");
            }

            return await implementation(groupIdGuid, userIdGuid);
        }

        public async Task<ActionResult> Validate(string groupId, bool validateUser, Func<Guid, Task<ActionResult>> implementation, CancellationToken cancellationToken)
        {
            if (!Guid.TryParse(groupId, out var groupIdGuid))
            {
                return new BadRequestObjectResult("Group ID supplied is not a valid GUID.");
            }

            if (!await this.groupService.GroupExistsAsync(groupIdGuid, cancellationToken))
            {
                return new NotFoundObjectResult("Group not found");
            }

            if (validateUser && !await this.userService.UserExistsAsync(this.userContextProvider.UserId, cancellationToken))
            {
                return new NotFoundObjectResult("User not found");
            }

            return await implementation(groupIdGuid);
        }

        public async Task<ActionResult> Validate(string groupId, string userId, bool validateGroupUser, Func<Guid, Guid, Task<ActionResult>> implementation, CancellationToken cancellationToken)
        {
            if (!Guid.TryParse(groupId, out var groupIdGuid))
            {
                return new BadRequestObjectResult("Group ID supplied is not a valid GUID.");
            }

            if (!await this.groupService.GroupExistsAsync(groupIdGuid, cancellationToken))
            {
                return new NotFoundObjectResult("Group not found");
            }

            if (!Guid.TryParse(userId, out var userIdGuid))
            {
                return new BadRequestObjectResult("User ID supplied is not a valid GUID.");
            }

            if (!await this.userService.UserExistsAsync(userIdGuid, cancellationToken))
            {
                return new NotFoundObjectResult("User not found");
            }

            if (validateGroupUser && !await this.groupUserService.GroupUserExistsAsync(groupIdGuid, userIdGuid, cancellationToken))
            {
                return new NotFoundObjectResult("Group user not found");
            }

            return await implementation(groupIdGuid, userIdGuid);
        }

        public async Task<ActionResult> Validate(string groupId, bool validateUser, bool validateGroupUser, Func<Guid, Task<ActionResult>> implementation, CancellationToken cancellationToken)
        {
            if (!Guid.TryParse(groupId, out var groupIdGuid))
            {
                return new BadRequestObjectResult("Group ID supplied is not a valid GUID.");
            }

            if (!await this.groupService.GroupExistsAsync(groupIdGuid, cancellationToken))
            {
                return new NotFoundObjectResult("Group not found");
            }

            if (validateUser && !await this.userService.UserExistsAsync(this.userContextProvider.UserId, cancellationToken))
            {
                return new NotFoundObjectResult("User not found");
            }

            if (validateGroupUser && !await this.groupUserService.GroupUserExistsAsync(groupIdGuid, this.userContextProvider.UserId, cancellationToken))
            {
                return new NotFoundObjectResult("Group user not found");
            }

            return await implementation(groupIdGuid);
        }
    }
}
