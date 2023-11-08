using BLL.Models;
using BLL.Models.Chat;
using BLL.Models.Enums;

namespace BLL.Interfaces
{
    public interface IConversationService
    {
        Task<Conversation> CreateConversationAsync(string senderId, string recipientId, ConversationType conversationType);
        Task<Conversation> GetConversationAsync(Guid conversationGuid);
        Task<Conversation?> GetConversationByIdsAsync(string? senderId, string? recipientId);
        Task<ChatConversation> GetUserConversationAsync(string userId, string conversationGuid);
        Task<IEnumerable<ChatConversation>> GetUserConversationsAsync(string userId, int? pageNumber, int? pageSize);
        Task<IEnumerable<Conversation>> GetBlockedConversationAsync(string userId);
        Task ChangePinConversation(PinConversation model);
        Task ChangeMuteConversation(MuteConversation model);
        Task DeleteConversation(Guid conversationGuid);
        Task BlockConversation(BlockConversation model);
    }
}
