namespace PL.Models.Chat
{
    public class MessageActionModel
    {
        public Guid? ConversationGuid { get; set; }
        public ulong? RecipientId { get; set; }
        public ChatMessageModel Message { get; set; }
    }
}
