using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using Tiebreaker.Api.FunctionWrappers;
using Tiebreaker.Api.Models;
using Tiebreaker.Api.Services.Interfaces;
using Tiebreaker.Data.Enums;
using Tiebreaker.Domain.Models;

namespace Tiebreaker.Api.Controllers
{
    public class GroupUserController
    {
        private readonly ILogger<GroupUserController> logger;
        private readonly IHttpRequestWrapper<PermissionType> httpRequestWrapper;
        private readonly IMapper mapper;
        private readonly IGroupUserService groupUserService;

        public GroupUserController(
            ILogger<GroupUserController> logger,
            IHttpRequestWrapper<PermissionType> httpRequestWrapper,
            IMapper mapper,
            IGroupUserService groupUserService)
        {
            this.logger = logger;
            this.httpRequestWrapper = httpRequestWrapper;
            this.mapper = mapper;
            this.groupUserService = groupUserService;
        }

        [FunctionName("AddGroupUser")]
        public async Task<ActionResult> AddGroupUser(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "groups/{groupId}/users/{userId}")] HttpRequest req,
            string groupId,
            string userId,
            ILogger logger,
            CancellationToken cancellationToken) =>
            await this.httpRequestWrapper.ExecuteAsync(
                new List<PermissionType> { PermissionType.GroupAdminAccess },
                async () =>
                {
                    var groupIdGuid = Guid.Parse(groupId);
                    var userIdGuid = Guid.Parse(userId);

                    return new OkObjectResult(new { groupUserId = await this.groupUserService.InviteUserAsync(groupIdGuid, userIdGuid, cancellationToken) });
                },
                cancellationToken);

        [FunctionName("UpdateGroupUserRoles")]
        public async Task<ActionResult> UpdateGroupUserRoles(
            [HttpTrigger(AuthorizationLevel.Anonymous, "put", Route = "groups/{groupId}/users/{userId}/roles")] HttpRequest req,
            string groupId,
            string userId,
            ILogger logger,
            CancellationToken cancellationToken) =>
            await this.httpRequestWrapper.ExecuteAsync(
                new List<PermissionType> { PermissionType.GroupAdminAccess },
                async () =>
                {
                    var requestBody = await ConstructRequestModelAsync<List<RoleDto>>(req);
                    var roles = this.mapper.Map<List<Role>>(requestBody);

                    if (!roles.TrueForAll(r => r.Id != null))
                    {
                        return new BadRequestObjectResult("Invalid collection of roles.");
                    }

                    var groupIdGuid = Guid.Parse(groupId);
                    var userIdGuid = Guid.Parse(userId);

                    return new OkObjectResult(new { groupUserId = await this.groupUserService.UpdateUserRolesAsync(groupIdGuid, userIdGuid, roles, cancellationToken) });
                },
                cancellationToken);

        [FunctionName("DeleteUser")]
        public async Task<ActionResult> DeleteUser(
            [HttpTrigger(AuthorizationLevel.Anonymous, "delete", Route = "groups/{groupId}/users/{userId}")] HttpRequest req,
            string groupId,
            string userId,
            ILogger logger,
            CancellationToken cancellationToken) =>
            await this.httpRequestWrapper.ExecuteAsync(
                new List<PermissionType> { PermissionType.GroupAdminAccess },
                async () =>
                {
                    var groupIdGuid = Guid.Parse(groupId);
                    var userIdGuid = Guid.Parse(userId);

                    return new OkObjectResult(new { groupUserId = await this.groupUserService.KickUserAsync(groupIdGuid, userIdGuid, cancellationToken) });
                },
                cancellationToken);

        [FunctionName("JoinGroup")]
        public async Task<ActionResult> JoinGroup(
            [HttpTrigger(AuthorizationLevel.Anonymous, "put", Route = "groups/{groupId}/join")] HttpRequest req,
            string groupId,
            ILogger logger,
            CancellationToken cancellationToken) =>
            await this.httpRequestWrapper.ExecuteAsync(
                new List<PermissionType> { PermissionType.GroupAdminAccess },
                async () =>
                {
                    var groupIdGuid = Guid.Parse(groupId);

                    return new OkObjectResult(new { groupUserId = await this.groupUserService.JoinGroupAsync(groupIdGuid, cancellationToken) });
                },
                cancellationToken);

        [FunctionName("LeaveGroup")]
        public async Task<ActionResult> LeaveGroup(
            [HttpTrigger(AuthorizationLevel.Anonymous, "delete", Route = "groups/{groupId}/leave")] HttpRequest req,
            string groupId,
            ILogger logger,
            CancellationToken cancellationToken) =>
            await this.httpRequestWrapper.ExecuteAsync(
                new List<PermissionType> { PermissionType.GroupAdminAccess },
                async () =>
                {
                    var groupIdGuid = Guid.Parse(groupId);

                    return new OkObjectResult(new { groupUserId = await this.groupUserService.LeaveGroupAsync(groupIdGuid, cancellationToken) });
                },
                cancellationToken);

        protected static async Task<T> ConstructRequestModelAsync<T>(HttpRequest req)
        {
            var content = await new StreamReader(req.Body).ReadToEndAsync();

            return JsonConvert.DeserializeObject<T>(content);
        }
    }
}
