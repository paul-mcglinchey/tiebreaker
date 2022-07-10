using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Tiebreaker.Api.FunctionWrappers;
using Tiebreaker.Data;
using Tiebreaker.Data.Enums;

namespace Tiebreaker.Api.Controllers
{
    public class UserController
    {
        private readonly ILogger<UserController> logger;
        private readonly IHttpRequestWrapper<Permission> httpRequestWrapper;
        private readonly TiebreakerContext context;

        public UserController(ILogger<UserController> logger, IHttpRequestWrapper<Permission> httpRequestWrapper, TiebreakerContext context)
        {
            this.logger = logger;
            this.httpRequestWrapper = httpRequestWrapper;
            this.context = context;
        }

        [FunctionName("AuthenticateUser")]
        public async Task<ActionResult> AuthenticateUser(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "users/authenticate")] HttpRequest req,
            ILogger logger,
            CancellationToken cancellationToken) =>
            await this.httpRequestWrapper.Execute(
                new List<Permission> { Permission.ApplicationAccess },
                async () =>
                {
                    return new StatusCodeResult((int)HttpStatusCode.OK);
                },
                cancellationToken);
    }
}
