using PL.Strategies.Models;

namespace PL.Strategies.Interfaces
{
    public interface ILoginStrategy
    {
        Task<LoginOutput> RoleLogin(LoginParams param);
    }

    public interface ILoginStrategyExecuter
    {
        Task<LoginOutput> Execute(LoginParams loginParams);
    }
}