using BLL.Models.Enums;

namespace BLL.Models.Chat
{
    public class SendChatMessage
    {
        public string SenderId { get; set; }
        public string? MessageText { get; set; }
        public MessageStatus MessageStatus { get; set; }
        public string ConversationGuid { get; set; }
    }
}
