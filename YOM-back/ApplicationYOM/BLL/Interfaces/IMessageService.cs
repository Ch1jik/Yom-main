using BLL.Models.Chat;

namespace BLL.Interfaces
{
    public interface IMessageService
    {
        Task AddMessageAsync(ChatMessage message, ulong id);
        Task<IEnumerable<ChatMessage>> GetAllConversationMessages(Guid conversationGuid, int pageNumber);
        Task DeleteMessage(ulong messageId);
        Task<ChatMessage> GetMessage(ChatMessage message);
    }
}
