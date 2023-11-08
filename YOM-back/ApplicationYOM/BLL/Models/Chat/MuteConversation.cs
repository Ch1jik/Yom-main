namespace BLL.Models.Chat
{
    public class MuteConversation
    {
        public bool IsMuted { get; set; }
        public Guid ConversationGuid { get; set; }
        public string UserId { get; set; }
    }
}
