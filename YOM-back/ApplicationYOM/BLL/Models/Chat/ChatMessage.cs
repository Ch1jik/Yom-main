using BLL.Models.Enums;

namespace BLL.Models.Chat
{
    public class ChatMessage
    {
        public ulong Id { get; set; }
        public string SenderId { get; set; }
        public string MessageText { get; set; }
        public Guid ConversationGuid { get; set; }
        public ulong ConversationId { get; set; }
        public DateTime SentAt { get; set; }
        public MessageStatus MessageStatus { get; set; }
    }
}
