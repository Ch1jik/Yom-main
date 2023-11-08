using BLL.Models.Enums;

namespace BLL.Models.Chat
{
    public class Conversation
    {
        public ulong Id { get; set; }
        public Guid ConversationGuid { get; set; }
        public ConversationType ConversationType { get; set; }
        public bool IsBlocked { get; set; }
        public string? LastMessageText { get; set; }
        public DateTime LastMessageSentAt { get; set; }
    }
}
