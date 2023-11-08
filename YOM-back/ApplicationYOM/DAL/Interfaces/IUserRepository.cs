using DAL.Entities;
using System.Linq.Expressions;
using DAL.Helpers;

namespace DAL.Interfaces
{
    public interface IUserRepository
    {
        void Add(ApplicationUser entity);

        Task DeleteById(string id);

        Task<IEnumerable<ApplicationUser>> GetAll();

        Task<IEnumerable<ApplicationUser>> GetAllByParamsAsync(Expression<Func<ApplicationUser, bool>> filterExpression);

        Task<IEnumerable<ApplicationUser>> GetAllByQueryAsync(FilterState filter);

        Task<ApplicationUser?> GetByParamAsync(Expression<Func<ApplicationUser, bool>> filterExpression);
    }
}