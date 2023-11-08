namespace PL.Models.Chat
{
    public class BlockConversationModel
    {
        public bool IsBlocked { get; set; }
        public Guid ConversationGuid { get; set; }
        public string UserId { get; set; }
    }
}
