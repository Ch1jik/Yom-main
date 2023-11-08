using Common.Models;
using Common.Utilities;
using PL.Strategies.Interfaces;
using PL.Strategies.Models;

namespace PL.Strategies.Services
{
    public class ApplicationUserLoginStrategy : ILoginStrategy
    {
        public async Task<LoginOutput> RoleLogin(LoginParams param)
        {
            var user = await param.ApplicationUserService.GetByEmail(param.LoginModel.Email);
            if (user == null)
                return new LoginOutput { ResultModel = ResultModel.Error(param.ErrorMessage) };
            var output = new LoginOutput();
            output.UserId = user.Id.ToString();
            return output;
        }
    }

    public class LoginStrategy : ILoginStrategyExecuter
    {
        public Dictionary<string, Func<ILoginStrategy>> ValidOperations => new Dictionary<string, Func<ILoginStrategy>>() {
            {Roles.ADMIN, new Func<ILoginStrategy>(() => new ApplicationUserLoginStrategy()) },
            {Roles.USER, new Func<ILoginStrategy>(() => new ApplicationUserLoginStrategy()) }
        };

        public async Task<LoginOutput> Execute(LoginParams loginParams)
        {
            var strategy = ValidOperations[loginParams.Role]();
            return await strategy.RoleLogin(loginParams);
        }
    }
}