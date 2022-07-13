using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Tiebreaker.Api.AccessControl.Interfaces;
using Tiebreaker.Api.Models;
using Tiebreaker.Api.Services.Interfaces;
using Tiebreaker.Data;

namespace Tiebreaker.Api.Services
{
    public class GroupService : IGroupService
    {
        private IUserContextProvider userContextProvider;
        private TiebreakerContext context;
        private IMapper mapper;

        public GroupService(IUserContextProvider userContextProvider, TiebreakerContext context, IMapper mapper)
        {
            this.userContextProvider = userContextProvider;
            this.context = context;
            this.mapper = mapper;
        }
        
        public async Task<List<GroupDto>> GetGroupsAsync(CancellationToken cancellationToken)
        {
            var groups = await this.context.Groups.Where(g => g.Users.Any(u => u.Id == this.userContextProvider.UserId)).ToListAsync(cancellationToken);

            return this.mapper.Map<List<GroupDto>>(groups);
        }
    }
}
