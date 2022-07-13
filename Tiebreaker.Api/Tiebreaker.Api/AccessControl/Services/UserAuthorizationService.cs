using System.Collections.Generic;
using System.Threading.Tasks;
using Tiebreaker.Api.AccessControl.Interfaces;
using Tiebreaker.Data.Enums;

namespace Tiebreaker.Api.AccessControl.Services
{
    public class UserAuthorizationService : IUserAuthorisationService<PermissionType>
    {
        public async Task<bool> IsAuthorised(List<PermissionType> requiredPermissions)
        {
            return true;
        }
    }
}
