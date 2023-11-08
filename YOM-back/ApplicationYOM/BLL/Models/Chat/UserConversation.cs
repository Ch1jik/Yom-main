using BLL.Models.Enums;

namespace BLL.Models.Chat
{
    public class UserConversation
    {
        public ulong Id { get; set; }
        public ConversationType ConversationType { get; set; }
        public string UserId { get; set; }
        public ulong ConversationId { get; set; }
        public Conversation Conversation { get; set; }
        public bool IsPinned { get; set; }
        public bool IsMuted { get; set; }
        public string RecipientId { get; set; }
    }
}
