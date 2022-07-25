using System.Threading;
using System.Threading.Tasks;
using Tiebreaker.Api.Models;

namespace Tiebreaker.Api.Services.Interfaces
{
    public interface IApplicationService
    {
        public Task<ListResponse<ApplicationDto>> GetApplicationsAsync(CancellationToken cancellationToken);
    }
}
