using System.Linq.Expressions;
using DAL.Data;
using DAL.Entities;
using DAL.Helpers;
using DAL.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories
{
    public class PurchaseRepository : IRepository<Purchase>
    {
        private readonly YomContext _context;
        public PurchaseRepository(YomContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Purchase>> GetAll()
        {
            return await _context.Purchases.Include(u=> u.Ad).ToListAsync();
        }

        public async Task<Purchase?> GetByParamAsync(Expression<Func<Purchase?, bool>> filterExpression)
        {
            return await _context.Purchases.FirstOrDefaultAsync(filterExpression) ?? null;
        }

        public void Add(Purchase entity)
        {
            try
            {
                _context.Purchases.Add(entity);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task DeleteById(ulong id)
        {
            var bannerToDelete = await _context.Purchases.FirstOrDefaultAsync(pr => pr.Id == id);
            if (bannerToDelete is not null)
                _context.Purchases.Remove(bannerToDelete);
        }

        public void Update(Purchase entity)
        {
            _context.Purchases.Update(entity);
        }

        public async Task<IEnumerable<Purchase>> GetAllByQueryAsync(FilterState query)
        {
            var result = _context.Purchases.Include(u => u.Ad).AsQueryable();
            var filteredResult = result.OrderByState(query)
                .FilterByState(query).ToPagedListAsync(query);
            return await filteredResult.ToListAsync();
        }
    }
}
