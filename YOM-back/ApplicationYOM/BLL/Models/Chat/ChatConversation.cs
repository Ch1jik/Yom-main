using BLL.Models.Enums;

namespace BLL.Models.Chat
{
    public class ChatConversation
    {
        public ulong Id { get; set; }
        public ConversationType ConversationType { get; set; }
        public Guid ConversationGuid { get; set; }
        public bool IsBlocked { get; set; }
        public DateTime? LastMessageSentAt { get; set; }
        public bool IsMuted { get; set; }
        public bool IsPinned { get; set; }
        public string RecipientId { get; set; }
        public string FullName { get; set; }
        public string UserName { get; set; }
        public string? AvatarPath { get; set; }
        public string? LastMessageText { get; set; }
    }
}
