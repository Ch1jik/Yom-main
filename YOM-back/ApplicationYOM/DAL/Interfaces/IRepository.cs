using DAL.Entities;
using System.Linq.Expressions;
using DAL.Helpers;

namespace DAL.Interfaces
{
    public interface IRepository<TEntity>
    {
        Task<IEnumerable<TEntity>> GetAll();

        //Task<IEnumerable<TEntity?>> GetAllByParamsAsync(Expression<Func<TEntity?, bool>> filterExpression);

        Task<TEntity?> GetByParamAsync(Expression<Func<TEntity?, bool>> filterExpression);

        void Add(TEntity entity);

        Task DeleteById(ulong id);

        void Update(TEntity entity);

        Task<IEnumerable<TEntity>> GetAllByQueryAsync(FilterState query);
    }
}
