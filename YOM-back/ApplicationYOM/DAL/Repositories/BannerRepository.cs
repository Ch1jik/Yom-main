using System.Linq.Expressions;
using DAL.Data;
using DAL.Entities;
using DAL.Helpers;
using DAL.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories
{
    public class BannerRepository : IRepository<Banner>
    {
        private readonly YomContext _context;
        public BannerRepository(YomContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Banner>> GetAll()
        {
            return await _context.Banners.ToListAsync();
        }

        public async Task<Banner?> GetByParamAsync(Expression<Func<Banner?, bool>> filterExpression)
        {
            return await _context.Banners.FirstOrDefaultAsync(filterExpression) ?? null;
        }

        public void Add(Banner entity)
        {
            try
            {
                _context.Banners.Add(entity);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task DeleteById(ulong id)
        {
            var bannerToDelete = await _context.Banners.FirstOrDefaultAsync(b => b.Id == id);
            if (bannerToDelete is not null)
                _context.Banners.Remove(bannerToDelete);
        }

        public void Update(Banner entity)
        {
            _context.Banners.Update(entity);
        }

        public async Task<IEnumerable<Banner>> GetAllByQueryAsync(FilterState query)
        {
            var result = _context.Banners.AsQueryable();
            var filteredResult = result.OrderByState(query)
                .FilterByState(query).ToPagedListAsync(query);
            return await filteredResult.ToListAsync();
        }
    }
}
