using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Tiebreaker.Api.FunctionWrappers;
using Tiebreaker.Data;
using Tiebreaker.Data.Enums;
using Tiebreaker.Domain.Models;

namespace Tiebreaker.Api.Controllers
{
    public class UserController
    {
        private readonly ILogger<UserController> logger;
        private readonly IFunctionWrapper functionWrapper;
        private readonly IHttpRequestWrapper<Permission> httpRequestWrapper;
        private readonly TiebreakerContext context;

        public UserController(ILogger<UserController> logger, IFunctionWrapper functionWrapper, IHttpRequestWrapper<Permission> httpRequestWrapper, TiebreakerContext context)
        {
            this.logger = logger;
            this.functionWrapper = functionWrapper;
            this.httpRequestWrapper = httpRequestWrapper;
            this.context = context;
        }

        [FunctionName("Signup")]
        public async Task<ActionResult<string>> Signup(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "users/signup")] HttpRequest req,
            ILogger logger,
            CancellationToken cancellationToken) =>
            await this.functionWrapper.ExecuteAsync<ActionResult>(
                async () =>
                {
                    var requestModel = await ConstructRequestModelAsync<User>(req);

                    if (requestModel.Username == null || requestModel.Email == null || requestModel.Password == null)
                    {
                        return new BadRequestResult();
                    }

                    return new OkObjectResult(GenerateToken());
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
                    return new OkObjectResult(GenerateToken());
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

        private static string GenerateToken()
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("GXw7gVFJs0yEAiFkPPbkNw=="));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var secToken = new JwtSecurityToken(
                signingCredentials: credentials,
                issuer: "Sample",
                audience: "Sample",
                claims: new[]
                {
                new Claim(JwtRegisteredClaimNames.Sub, "meziantou")
                },
                expires: DateTime.UtcNow.AddDays(1));

            var handler = new JwtSecurityTokenHandler();
            return handler.WriteToken(secToken);
        }
    }
}
