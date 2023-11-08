namespace PL.Models.Chat
{
    public class CreateConversation
    {
        public string SenderId { get; set; }
        public string RecipientId { get; set; }
        public ConversationType ConversationType { get; set; }
    }
}
