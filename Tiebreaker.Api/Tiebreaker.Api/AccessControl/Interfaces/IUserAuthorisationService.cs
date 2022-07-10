using System.Collections.Generic;
using System.Threading.Tasks;

namespace Tiebreaker.Api.AccessControl.Interfaces
{
    public interface IUserAuthorisationService<TPermission>
    {
        Task<bool> IsAuthorised(List<TPermission> requiredPermissions);
    }
}
