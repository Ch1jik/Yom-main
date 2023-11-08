using System.Linq.Expressions;
using DAL.Data;
using DAL.Entities;
using DAL.Helpers;
using DAL.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories
{
    public class ChatMessageRepository : IMessageRepository
    {
        private readonly YomContext _context;

        public ChatMessageRepository(YomContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<ChatMessage>> GetAll()
        {
            return await _context.ChatMessages.ToListAsync();
        }

        public async Task<ChatMessage?> GetByParamAsync(Expression<Func<ChatMessage?, bool>> filterExpression)
        {
            return await _context.ChatMessages.AsNoTracking().FirstOrDefaultAsync(filterExpression) ?? null;
        }

        public void Add(ChatMessage entity)
        {
            try
            {
                _context.ChatMessages.Add(entity);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task DeleteById(ulong id)
        {
            var msgToDelete = await _context.ChatMessages.FirstOrDefaultAsync(ad => ad.Id == id);
            if (msgToDelete is not null)
                _context.ChatMessages.Remove(msgToDelete);
        }

        public void Update(ChatMessage entity)
        {
            _context.ChatMessages.Update(entity);
        }

        public async Task<IEnumerable<ChatMessage>> GetAllByQueryAsync(FilterState query)
        {
            var result = _context.ChatMessages.AsNoTracking().AsQueryable();
            var filteredResult = result.OrderByState(query)
                .FilterByState(query).ToPagedListAsync(query);
            return await filteredResult.ToListAsync();
        }

        public void DeleteAllMessagesFromConversation(Guid conversationGuid)
        {
            var recordsToDelete = _context.ChatMessages.AsNoTracking()
                .Where(e => e.ConversationGuid == conversationGuid)
                .ToList();

            _context.ChatMessages.RemoveRange(recordsToDelete);
        }
    }
}
