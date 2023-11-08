using System.Linq.Expressions;
using DAL.Data;
using DAL.Entities;
using DAL.Helpers;
using DAL.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories
{
    public class UserReviewRepository : IRepository<UserReview>
    {
        private readonly YomContext _context;
        public UserReviewRepository(YomContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<UserReview>> GetAll()
        {
            return await _context.UserReviews.ToListAsync();
        }

        public async Task<UserReview?> GetByParamAsync(Expression<Func<UserReview?, bool>> filterExpression)
        {
            return await _context.UserReviews.Include(u=> u.Ad).Include(u => u.Receiver).Include(u => u.Sender).AsNoTracking().FirstOrDefaultAsync(filterExpression);
        }

        public void Add(UserReview entity)
        {
            try
            {
                _context.UserReviews.Add(entity);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task DeleteById(ulong id)
        {
            var reviewToDelete = await _context.UserReviews.FirstOrDefaultAsync(ad => ad.Id == id);
            if (reviewToDelete is not null)
                _context.UserReviews.Remove(reviewToDelete);
        }

        public void Update(UserReview entity)
        {
            _context.UserReviews.Update(entity);
        }

        public async Task<IEnumerable<UserReview>> GetAllByQueryAsync(FilterState query)
        {
            var result = _context.UserReviews.Include(u => u.Ad).Include(u => u.Receiver).Include(u => u.Sender).AsNoTracking().AsQueryable();
            var filteredResult = result.OrderByState(query)
                .FilterByState(query).ToPagedListAsync(query);
            return await filteredResult.ToListAsync();
        }
    }
}
