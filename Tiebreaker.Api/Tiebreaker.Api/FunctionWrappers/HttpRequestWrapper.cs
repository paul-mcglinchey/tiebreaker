using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Net;
using System.Runtime.CompilerServices;
using System.Threading;
using System.Threading.Tasks;
using Tiebreaker.Api.AccessControl.Interfaces;

namespace Tiebreaker.Api.FunctionWrappers
{
    public sealed class HttpRequestWrapper<TPermission> : IHttpRequestWrapper<TPermission>
    {
        private readonly ILogger<HttpRequestWrapper<TPermission>> logger;
        private readonly IAuthenticator authenticator;
        private readonly IUserAuthorisationService<TPermission> userAuthorizationService;
        private readonly IHttpContextAccessor httpContextAccessor;

        public HttpRequestWrapper(ILogger<HttpRequestWrapper<TPermission>> logger, IAuthenticator authenticator, IUserAuthorisationService<TPermission> userAuthorizationService, IHttpContextAccessor httpContextAccessor)
        {
            this.logger = logger;
            this.authenticator = authenticator;
            this.userAuthorizationService = userAuthorizationService;
            this.httpContextAccessor = httpContextAccessor;
        }

        public async Task<ActionResult> Execute(List<TPermission> requiredPermissions, Func<Task<ActionResult>> implementation, CancellationToken cancellationToken, [CallerMemberName] string functionName = null) =>
            (await this.Execute<object>(requiredPermissions, async () => await implementation(), cancellationToken, functionName)).Result;

        public async Task<ActionResult<TResult>> Execute<TResult>(List<TPermission> requiredPermissions, Func<Task<ActionResult<TResult>>> implementation, CancellationToken cancellationToken, [CallerMemberName] string functionName = null)
        {
            try
            {
                // Authentication
                if (!await this.authenticator.AuthenticateAsync())
                {
                    this.logger.LogDebug("401: Unable to authenticate");
                    return new StatusCodeResult((int)HttpStatusCode.Unauthorized);
                }
            }
            catch (Exception ex)
            {
                this.logger.LogError(ex, $"Unexpected exception in user authentication for {functionName}.");
                return new StatusCodeResult(500);
            }

            try
            {
                if (!await this.userAuthorizationService.IsAuthorised(requiredPermissions))
                {
                    this.logger.LogDebug("401: Unable to authorize");
                    return new StatusCodeResult((int)HttpStatusCode.Unauthorized);
                }

                this.logger.LogInformation($"Entered {functionName}.");

                return await implementation();
            }
            catch (Exception ex)
            {
                this.logger.LogError(ex, $"Error in {functionName}.");
                return new NotFoundResult();
            }
            finally
            {
                this.logger.LogInformation($"Leaving {functionName}.");
            };
        }
    }
}
