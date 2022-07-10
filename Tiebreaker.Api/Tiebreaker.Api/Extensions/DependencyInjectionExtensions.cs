using Microsoft.Extensions.DependencyInjection;
using Tiebreaker.Api.AccessControl.Interfaces;
using Tiebreaker.Api.AccessControl.Services;
using Tiebreaker.Api.FunctionWrappers;
using Tiebreaker.Data.Enums;

namespace Tiebreaker.Api.Extensions
{
    public static class DependencyInjectionExtensions
    {
        public static IServiceCollection AddFunctionWrapper(this IServiceCollection services) =>
            services.AddScoped<IFunctionWrapper, FunctionWrapper>()
                    .AddHttpContextAccessor();

        public static IServiceCollection AddAccessControl(this IServiceCollection services) =>
            services.AddAccessControl<Permission, UserAuthorizationService>();

        public static IServiceCollection AddAccessControl<TPermission, TUserAuthorizationService>(this IServiceCollection services)
            where TUserAuthorizationService : class, IUserAuthorisationService<TPermission>
        {
            return services.AddScoped<IAuthenticator, HttpAuthenticator>()
                    .AddScoped<IHttpRequestWrapper<TPermission>, HttpRequestWrapper<TPermission>>()
                    .AddScoped<IUserAuthorisationService<TPermission>, TUserAuthorizationService>()
                    .AddFunctionWrapper();
        }
    }
}
