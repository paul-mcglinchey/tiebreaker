namespace Tiebreaker.Api.AccessControl.Interfaces
{
    using System;

    public interface IUserContextProvider
    {
        Guid UserId { get; }
    }
}
