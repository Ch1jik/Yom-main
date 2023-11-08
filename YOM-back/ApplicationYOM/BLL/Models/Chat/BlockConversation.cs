namespace BLL.Models.Chat
{
    public class BlockConversation
    {
        public bool IsBlocked { get; set; }
        public Guid ConversationGuid { get; set; }
        public string UserId { get; set; }
    }
}
