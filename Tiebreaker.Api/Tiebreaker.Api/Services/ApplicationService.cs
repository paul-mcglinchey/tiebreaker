using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Tiebreaker.Api.Models;
using Tiebreaker.Api.Services.Interfaces;
using Tiebreaker.Data;

namespace Tiebreaker.Api.Services
{
    public class ApplicationService : IApplicationService
    {
        private readonly IMapper mapper;
        private readonly TiebreakerContext context;

        public ApplicationService(IMapper mapper, TiebreakerContext context)
        {
            this.mapper = mapper;
            this.context = context;
        }

        public async Task<ListResponse<ApplicationDto>> GetApplicationsAsync(CancellationToken cancellationToken)
        {
            var applications = await this.context.Applications.ToListAsync(cancellationToken);

            return new ListResponse<ApplicationDto>
            {
                Items = this.mapper.Map<List<ApplicationDto>>(applications),
                Count = applications.Count,
            };
        }
    }
}
