using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Tiebreaker.Api.Models;

namespace Tiebreaker.Api.Services.Interfaces
{
    public interface IGroupService
    {
        public Task<List<GroupDto>> GetGroupsAsync(CancellationToken cancellationToken);
    }
}
