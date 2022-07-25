using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Tiebreaker.Api.FunctionWrappers;
using Tiebreaker.Api.Models;
using Tiebreaker.Api.Services.Interfaces;
using Tiebreaker.Data.Enums;

namespace Tiebreaker.Api.Controllers
{
    public class ApplicationController
    {
        private readonly ILogger<ApplicationController> logger;
        private readonly IHttpRequestWrapper<PermissionType> httpRequestWrapper;
        private readonly IMapper mapper;
        private readonly IApplicationService applicationService;

        public ApplicationController(
            ILogger<ApplicationController> logger,
            IHttpRequestWrapper<PermissionType> httpRequestWrapper,
            IMapper mapper,
            IApplicationService applicationService)
        {
            this.logger = logger;
            this.httpRequestWrapper = httpRequestWrapper;
            this.mapper = mapper;
            this.applicationService = applicationService;
        }

        [FunctionName("GetApplications")]
        public async Task<ActionResult<ListResponse<ApplicationDto>>> GetRoles(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "applications")] HttpRequest req,
            ILogger logger,
            CancellationToken cancellationToken) =>
            await this.httpRequestWrapper.ExecuteAsync(
                new List<PermissionType> { PermissionType.ApplicationAccess },
                async () => new OkObjectResult(await this.applicationService.GetApplicationsAsync(cancellationToken)),
                cancellationToken);
    }
}
