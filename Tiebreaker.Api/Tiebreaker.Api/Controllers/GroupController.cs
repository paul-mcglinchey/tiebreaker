using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Tiebreaker.Api.AccessControl.Interfaces;
using Tiebreaker.Api.FunctionWrappers;
using Tiebreaker.Api.Models;
using Tiebreaker.Api.Services.Interfaces;
using Tiebreaker.Data;
using Tiebreaker.Data.Enums;
using Tiebreaker.Domain.Models;

namespace Tiebreaker.Api.Controllers
{
    public class GroupController
    {
        private readonly ILogger<GroupController> logger;
        private readonly IHttpRequestWrapper<PermissionType> httpRequestWrapper;
        private readonly TiebreakerContext context;
        private readonly IMapper mapper;
        private readonly IUserContextProvider userContextProvider;
        private readonly IGroupService groupService;

        public GroupController(
            ILogger<GroupController> logger,
            IHttpRequestWrapper<PermissionType> httpRequestWrapper,
            TiebreakerContext context,
            IMapper mapper,
            IUserContextProvider userContextProvider,
            IGroupService groupService)
        {
            this.logger = logger;
            this.httpRequestWrapper = httpRequestWrapper;
            this.context = context;
            this.mapper = mapper;
            this.userContextProvider = userContextProvider;
            this.groupService = groupService;
        }

        [FunctionName("GetGroups")]
        public async Task<ActionResult> GetGroups(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "groups")] HttpRequest req,
            ILogger logger,
            CancellationToken cancellationToken) =>
            await this.httpRequestWrapper.ExecuteAsync(
                new List<PermissionType> { PermissionType.ApplicationAccess },
                async () => new OkObjectResult(this.groupService.GetGroupsAsync(cancellationToken)), cancellationToken);

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

                    var currentUser = await this.context.Users.Where(u => u.Id == this.userContextProvider.UserId).SingleOrDefaultAsync(cancellationToken);
                    
                    group.Users.Add(currentUser);

                    var currentGroupUser = await this.context.GroupUsers.Where(gu => gu.UserId == currentUser.Id && gu.GroupId == group.Id).SingleOrDefaultAsync(cancellationToken);

                    currentGroupUser.Roles.Add(await this.context.Roles.Where(r => r.Name == "Group Admin").SingleOrDefaultAsync(cancellationToken));
                    
                    this.context.Groups.Add(group);

                    await this.context.SaveChangesAsync(cancellationToken);

                    return new CreatedAtRouteResult("groups", new { groupId = group.Id });
                },
                cancellationToken);

        protected static async Task<T> ConstructRequestModelAsync<T>(HttpRequest req)
        {
            var content = await new StreamReader(req.Body).ReadToEndAsync();

            return JsonConvert.DeserializeObject<T>(content);
        }
    }
}
