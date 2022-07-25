using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Tiebreaker.Api.FunctionWrappers
{
    public interface IGroupValidationWrapper
    {
        public Task<ActionResult> Validate(HttpRequest req, Func<Guid, Task<ActionResult>> implementation, CancellationToken cancellationToken);

        public Task<ActionResult> Validate(string groupId, Func<Guid, Task<ActionResult>> implementation, CancellationToken cancellationToken);

        public Task<ActionResult> Validate(string groupId, string userId, Func<Guid, Guid, Task<ActionResult>> implementation, CancellationToken cancellationToken);

        public Task<ActionResult> Validate(string groupId, string userId, bool validateGroupUser, Func<Guid, Guid, Task<ActionResult>> implementation, CancellationToken cancellationToken);

        public Task<ActionResult> Validate(string groupId, bool validateUser, bool validateGroupUser, Func<Guid, Task<ActionResult>> implementation, CancellationToken cancellationToken);
    }
}
