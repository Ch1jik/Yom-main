using DAL.Helpers;
using System.Linq.Expressions;
using DAL.Entities;

namespace DAL.Interfaces
{
    public interface IMessageRepository
    {
        Task<IEnumerable<ChatMessage>> GetAll();

        Task<ChatMessage?> GetByParamAsync(Expression<Func<ChatMessage?, bool>> filterExpression);

        void Add(ChatMessage entity);

        Task DeleteById(ulong id);

        void Update(ChatMessage entity);

        Task<IEnumerable<ChatMessage>> GetAllByQueryAsync(FilterState query);

        void DeleteAllMessagesFromConversation(Guid conversationGuid);
    }
}
