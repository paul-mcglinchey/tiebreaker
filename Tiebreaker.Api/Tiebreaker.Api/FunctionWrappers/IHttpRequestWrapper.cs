using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Threading;
using System.Threading.Tasks;

namespace Tiebreaker.Api.FunctionWrappers
{
    public interface IHttpRequestWrapper<TPermission>
    {
        public Task<ActionResult> Execute(List<TPermission> requiredPermissions, Func<Task<ActionResult>> implementation, CancellationToken cancellationToken, [CallerMemberName] string functionName = null);

        public Task<ActionResult<TResult>> Execute<TResult>(List<TPermission> requiredPermissions, Func<Task<ActionResult<TResult>>> implementation, CancellationToken cancellationToken, [CallerMemberName] string functionName = null);
    }
}
