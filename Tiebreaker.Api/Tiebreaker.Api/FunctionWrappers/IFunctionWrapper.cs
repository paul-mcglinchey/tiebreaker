using System;
using System.Runtime.CompilerServices;
using System.Threading;
using System.Threading.Tasks;

namespace Tiebreaker.Api.FunctionWrappers
{
    public interface IFunctionWrapper
    {
        public Task ExecuteAsync(Func<Task> implementation, CancellationToken cancellationToken, [CallerMemberName] string functionName = null);

        public Task<T> ExecuteAsync<T>(Func<Task<T>> implementation, CancellationToken cancellationToken, [CallerMemberName] string functionName = null);
    }
}
