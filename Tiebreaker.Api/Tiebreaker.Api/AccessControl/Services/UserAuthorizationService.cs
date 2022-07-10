using System.Collections.Generic;
using System.Threading.Tasks;
using Tiebreaker.Api.AccessControl.Interfaces;
using Tiebreaker.Data.Enums;

namespace Tiebreaker.Api.AccessControl.Services
{
    public class UserAuthorizationService : IUserAuthorisationService<Permission>
    {
        public async Task<bool> IsAuthorised(List<Permission> requiredPermissions)
        {
            return true;
        }
    }
}
