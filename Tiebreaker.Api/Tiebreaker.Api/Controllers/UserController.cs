using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Tiebreaker.Api.FunctionWrappers;
using Tiebreaker.Api.Models;
using Tiebreaker.Api.Services.Interfaces;
using Tiebreaker.Data;
using Tiebreaker.Data.Enums;

namespace Tiebreaker.Api.Controllers
{
    public class UserController
    {
        private readonly ILogger<UserController> logger;
        private readonly IFunctionWrapper functionWrapper;
        private readonly IHttpRequestWrapper<Permission> httpRequestWrapper;
        private readonly TiebreakerContext context;
        private readonly IUserService userService;
        private readonly IMapper mapper;

        public UserController(ILogger<UserController> logger, IFunctionWrapper functionWrapper, IHttpRequestWrapper<Permission> httpRequestWrapper, TiebreakerContext context, IUserService userService, IMapper mapper)
        {
            this.logger = logger;
            this.functionWrapper = functionWrapper;
            this.httpRequestWrapper = httpRequestWrapper;
            this.context = context;
            this.userService = userService;
            this.mapper = mapper;
        }

        [FunctionName("Signup")]
        public async Task<ActionResult<string>> Signup(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "users/signup")] HttpRequest req,
            ILogger logger,
            CancellationToken cancellationToken) =>
            await this.functionWrapper.ExecuteAsync<ActionResult>(
                async () =>
                {
                    var userRequest = await ConstructRequestModelAsync<UserRequest>(req);

                    if (userRequest.Username == null || userRequest.Email == null || userRequest.Password == null)
                    {
                        return new BadRequestObjectResult("Fields missing from request.");
                    }

                    if (await this.userService.UserExistsAsync(userRequest, cancellationToken))
                    {
                        return new BadRequestObjectResult("User already exists.");
                    }

                    var user = await this.userService.CreateUserAsync(userRequest, cancellationToken);

                    return new OkObjectResult(user);
                },
                cancellationToken);

        [FunctionName("Login")]
        public async Task<ActionResult<string>> Login(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "users/login")] HttpRequest req,
            ILogger logger,
            CancellationToken cancellationToken) =>
            await this.functionWrapper.ExecuteAsync<ActionResult>(
                async () =>
                {
                    var userRequest = await ConstructRequestModelAsync<UserRequest>(req);

                    if (userRequest.UsernameOrEmail == null || userRequest.Password == null)
                    {
                        return new BadRequestObjectResult("Fields missing from request.");
                    }

                    if (!await this.userService.UserExistsAsync(userRequest, cancellationToken))
                    {
                        return new BadRequestObjectResult("Incorrect email or username.");
                    }

                    var user = await this.userService.AuthenticateUserAsync(userRequest, cancellationToken);

                    return user != null
                        ? new OkObjectResult(user)
                        : new UnauthorizedResult();
                },
                cancellationToken);

        [FunctionName("AuthenticateUser")]
        public async Task<ActionResult> AuthenticateUser(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "users/authenticate")] HttpRequest req,
            ILogger logger,
            CancellationToken cancellationToken) =>
            await this.httpRequestWrapper.ExecuteAsync(
                new List<Permission> { Permission.ApplicationAccess },
                async () =>
                {
                    return new StatusCodeResult((int)HttpStatusCode.OK);
                },
                cancellationToken);

        protected static async Task<T> ConstructRequestModelAsync<T>(HttpRequest req)
        {
            var content = await new StreamReader(req.Body).ReadToEndAsync();

            return JsonConvert.DeserializeObject<T>(content);
        }
    }
}
