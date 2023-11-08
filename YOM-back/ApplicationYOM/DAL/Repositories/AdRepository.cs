using DAL.Data;
using DAL.Entities;
using DAL.Interfaces;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using DAL.Helpers;


namespace DAL.Repositories
{
    internal class AdRepository : IRepository<Ad>
    {
        private readonly YomContext _context;
        public AdRepository(YomContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Ad>> GetAll()
        {
            return await _context.Ads.ToListAsync();
        }

        public async Task<Ad?> GetByParamAsync(Expression<Func<Ad?, bool>> filterExpression)
        {
            return await _context.Ads.Include(a=>a.House).Include(a=>a.Auto).AsNoTracking().FirstOrDefaultAsync(filterExpression) ?? null;
        }

        public void Add(Ad entity)
        {
            try
            {
                _context.Ads.Add(entity);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task DeleteById(ulong id)
        {
            var adToDelete = await _context.Ads.FirstOrDefaultAsync(ad => ad.Id == id);
            if (adToDelete is not null)
                _context.Ads.Remove(adToDelete);
        }

        public void Update(Ad entity)
        {
            _context.Ads.Update(entity);
        }

        public async Task<IEnumerable<Ad>> GetAllByQueryAsync(FilterState query)
        {
            var result = _context.Ads.Include(a => a.House).Include(a => a.Auto).AsNoTracking().AsQueryable();
            var filteredResult = result.OrderByState(query)
                .FilterByState(query).ToPagedListAsync(query);
            return await filteredResult.ToListAsync();
        }
    }
}
