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
    public class GroupController
    {
        private readonly ILogger<GroupController> logger;
        private readonly IHttpRequestWrapper<PermissionType> httpRequestWrapper;
        private readonly IMapper mapper;
        private readonly IGroupService groupService;

        public GroupController(
            ILogger<GroupController> logger,
            IHttpRequestWrapper<PermissionType> httpRequestWrapper,
            IMapper mapper,
            IGroupService groupService)
        {
            this.logger = logger;
            this.httpRequestWrapper = httpRequestWrapper;
            this.mapper = mapper;
            this.groupService = groupService;
        }

        [FunctionName("GetGroups")]
        public async Task<ActionResult> GetGroups(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "groups")] HttpRequest req,
            ILogger logger,
            CancellationToken cancellationToken) =>
            await this.httpRequestWrapper.ExecuteAsync(
                new List<PermissionType> { PermissionType.ApplicationAccess },
                async () => new OkObjectResult(await this.groupService.GetGroupsAsync(cancellationToken)), cancellationToken);

        [FunctionName("CreateGroup")]
        public async Task<ActionResult> CreateGroup(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "groups")] HttpRequest req,
            ILogger logger,
            CancellationToken cancellationToken) =>
            await this.httpRequestWrapper.ExecuteAsync(
                new List<PermissionType> { PermissionType.ApplicationAccess },
                async () =>
                {
                    var requestBody = await ConstructRequestModelAsync<GroupDto>(req);
                    var group = this.mapper.Map<Group>(requestBody);

                    var groupId = await this.groupService.CreateGroupAsync(group, cancellationToken);

                    return new CreatedAtRouteResult("groups", new { groupId = groupId });
                },
                cancellationToken);

        [FunctionName("UpdateGroup")]
        public async Task<ActionResult> UpdateGroup(
            [HttpTrigger(AuthorizationLevel.Anonymous, "put", Route = "groups/{groupId}")] HttpRequest req,
            string groupId,
            ILogger logger,
            CancellationToken cancellationToken) =>
            await this.httpRequestWrapper.ExecuteAsync(
                new List<PermissionType> { PermissionType.GroupAdminAccess },
                async () =>
                {
                    var requestBody = await ConstructRequestModelAsync<GroupDto>(req);
                    var group = this.mapper.Map<Group>(requestBody);

                    var groupIdGuid = Guid.Parse(groupId);

                    return new OkObjectResult(new { groupId = await this.groupService.UpdateGroupAsync(groupIdGuid, group, cancellationToken) });
                },
                cancellationToken);

        [FunctionName("DeleteGroup")]
        public async Task<ActionResult> DeleteGroup(
            [HttpTrigger(AuthorizationLevel.Anonymous, "delete", Route = "groups/{groupId}")] HttpRequest req,
            string groupId,
            ILogger logger,
            CancellationToken cancellationToken) =>
            await this.httpRequestWrapper.ExecuteAsync(
                new List<PermissionType> { PermissionType.GroupAdminAccess },
                async () =>
                {
                    var groupIdGuid = Guid.Parse(groupId);

                    return new OkObjectResult(new { groupId = await this.groupService.DeleteGroupAsync(groupIdGuid, cancellationToken) });
                },
                cancellationToken);

        protected static async Task<T> ConstructRequestModelAsync<T>(HttpRequest req)
        {
            var content = await new StreamReader(req.Body).ReadToEndAsync();

            return JsonConvert.DeserializeObject<T>(content);
        }
    }
}
