using DAL.Data;
using DAL.Entities;
using DAL.Interfaces;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using DAL.Helpers;

namespace DAL.Repositories
{
    public class UserConversationRepository : IRepository<UserConversation>
    {
        private readonly YomContext _context;

        public UserConversationRepository(YomContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<UserConversation>> GetAll()
        {
            return await _context.UserConversations.AsNoTracking().ToListAsync();
        }

        public async Task<UserConversation?> GetByParamAsync(Expression<Func<UserConversation?, bool>> filterExpression)
        {
            return await _context.UserConversations.AsNoTracking().Include(u => u.Conversation).Include(u => u.User).Include(u => u.Recipient).FirstOrDefaultAsync(filterExpression) ?? null;
        }

        public void Add(UserConversation entity)
        {
            try
            {
                _context.UserConversations.Add(entity);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task DeleteById(ulong id)
        {
            var toDelete = await _context.UserConversations.FirstOrDefaultAsync(ad => ad.Id == id);
            if (toDelete is not null)
                _context.UserConversations.Remove(toDelete);
        }

        public void Update(UserConversation entity)
        {
            _context.UserConversations.Update(entity);
        }

        public async Task<IEnumerable<UserConversation>> GetAllByQueryAsync(FilterState query)
        {
            var result = _context.UserConversations.AsNoTracking().Include(u => u.Conversation).Include(u => u.User).Include(u => u.Recipient).AsQueryable();
            var filteredResult = result.OrderByState(query)
                .FilterByState(query).ToPagedListAsync(query);
            return await filteredResult.ToListAsync();
        }
    }
}
