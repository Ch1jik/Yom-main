using System.Linq.Expressions;
using DAL.Data;
using DAL.Entities;
using DAL.Helpers;
using DAL.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories
{
    public class FavoriteAdRepository : IRepository<FavoriteAd>
    {
        private readonly YomContext _context;
        public FavoriteAdRepository(YomContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<FavoriteAd>> GetAll()
        {
            return await _context.FavoriteAds.ToListAsync();
        }

        public async Task<FavoriteAd?> GetByParamAsync(Expression<Func<FavoriteAd?, bool>> filterExpression)
        {
            return await _context.FavoriteAds.Include(u => u.Ad).FirstOrDefaultAsync(filterExpression);
        }

        public void Add(FavoriteAd entity)
        {
            try
            {
                _context.FavoriteAds.Add(entity);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task DeleteById(ulong id)
        {
            var adToDelete = await _context.FavoriteAds.FirstOrDefaultAsync(ad => ad.Id == id);
            if (adToDelete is not null)
                _context.FavoriteAds.Remove(adToDelete);
        }

        public void Update(FavoriteAd entity)
        {
            _context.FavoriteAds.Update(entity);
        }

        public async Task<IEnumerable<FavoriteAd>> GetAllByQueryAsync(FilterState query)
        {
            var result = _context.FavoriteAds.Include(u => u.Ad).AsQueryable();
            var filteredResult = result.OrderByState(query)
                .FilterByState(query).ToPagedListAsync(query);
            return await filteredResult.ToListAsync();
        }
    }
}
