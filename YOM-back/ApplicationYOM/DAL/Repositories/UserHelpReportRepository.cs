using DAL.Data;
using DAL.Entities;
using DAL.Helpers;
using DAL.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace DAL.Repositories
{
    public class UserHelpReportRepository : IRepository<UserHelpReport>
    {
        private readonly YomContext _context;
        public UserHelpReportRepository(YomContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<UserHelpReport>> GetAll()
        {
            return await _context.UserHelpReports.ToListAsync();
        }

        public void Add(UserHelpReport entity)
        {
            try
            {
                _context.UserHelpReports.Add(entity);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task DeleteById(ulong id)
        {
            var userHelpReport = await _context.UserHelpReports.FirstOrDefaultAsync(u => u.Id == id);
            if (userHelpReport is not null)
                _context.UserHelpReports.Remove(userHelpReport);
        }

        public void Update(UserHelpReport entity)
        {
            _context.UserHelpReports.Update(entity);
        }

        public async Task<IEnumerable<UserHelpReport>> GetAllByQueryAsync(FilterState query)
        {
            var result = _context.UserHelpReports.AsQueryable();
            var filteredResult = result.OrderByState(query)
                .FilterByState(query).ToPagedListAsync(query);
            return await filteredResult.ToListAsync();
        }

        public async Task<UserHelpReport?> GetByParamAsync(Expression<Func<UserHelpReport?, bool>> filterExpression)
        {
            return await _context.UserHelpReports.FirstOrDefaultAsync(filterExpression) ?? null;
        }
    }
}
