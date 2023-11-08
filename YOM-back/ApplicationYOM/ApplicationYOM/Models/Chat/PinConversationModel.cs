namespace PL.Models.Chat
{
    public class PinConversationModel
    {
        public bool IsPinned { get; set; }
        public Guid ConversationGuid { get; set; }
        public string UserId { get; set; }
    }
}
