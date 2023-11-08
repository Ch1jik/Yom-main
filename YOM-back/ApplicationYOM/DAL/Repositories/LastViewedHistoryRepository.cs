using System.Linq.Expressions;
using DAL.Data;
using DAL.Entities;
using DAL.Helpers;
using DAL.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories
{
    public class LastViewedHistoryRepository : IRepository<LastViewedHistory>
    {
        private readonly YomContext _context;
        public LastViewedHistoryRepository(YomContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<LastViewedHistory>> GetAll()
        {
            return await _context.LastViewedHistories.ToListAsync();
        }

        public async Task<LastViewedHistory?> GetByParamAsync(Expression<Func<LastViewedHistory?, bool>> filterExpression)
        {
            return await _context.LastViewedHistories.AsNoTracking().Include(ad=> ad.Ad).FirstOrDefaultAsync(filterExpression) ?? null;
        }

        public void Add(LastViewedHistory entity)
        {
            try
            {
                _context.LastViewedHistories.Add(entity);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task DeleteById(ulong id)
        {
            var viewToDelete = await _context.LastViewedHistories.FirstOrDefaultAsync(ad => ad.Id == id);
            if (viewToDelete is not null)
                _context.LastViewedHistories.Remove(viewToDelete);
        }

        public void Update(LastViewedHistory entity)
        {
            _context.LastViewedHistories.Update(entity);
        }

        public async Task<IEnumerable<LastViewedHistory>> GetAllByQueryAsync(FilterState query)
        {
            var result = _context.LastViewedHistories.Include(ad => ad.Ad).AsQueryable();
            var filteredResult = result.OrderByState(query)
                .FilterByState(query).ToPagedListAsync(query);
            return await filteredResult.ToListAsync();
        }
    }
}
