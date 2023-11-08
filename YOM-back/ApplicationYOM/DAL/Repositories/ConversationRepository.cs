using System.Linq.Expressions;
using DAL.Data;
using DAL.Entities;
using DAL.Helpers;
using DAL.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories
{
    public class ConversationRepository : IRepository<Conversation>
    {
        private readonly YomContext _context;

        public ConversationRepository(YomContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Conversation>> GetAll()
        {
            return await _context.Conversations.ToListAsync();
        }

        public async Task<Conversation?> GetByParamAsync(Expression<Func<Conversation?, bool>> filterExpression)
        {
            return await _context.Conversations.AsNoTracking().Include(u => u.Messages).Include(x => x.UserConversations).FirstOrDefaultAsync(filterExpression) ?? null;
        }

        public void Add(Conversation entity)
        {
            try
            {
                _context.Conversations.Add(entity);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task DeleteById(ulong id)
        {
            var conversationToDelete = await _context.Conversations.AsNoTracking().FirstOrDefaultAsync(ad => ad.Id == id);
            if (conversationToDelete is not null)
                _context.Conversations.Remove(conversationToDelete);
        }

        public void Update(Conversation entity)
        {
            _context.Conversations.Update(entity);
        }

        public async Task<IEnumerable<Conversation>> GetAllByQueryAsync(FilterState query)
        {
            var result = _context.Conversations.AsNoTracking().Include(u=> u.Messages).AsQueryable();
            var filteredResult = result.OrderByState(query)
                .FilterByState(query).ToPagedListAsync(query);
            return await filteredResult.ToListAsync();
        }
    }
}
