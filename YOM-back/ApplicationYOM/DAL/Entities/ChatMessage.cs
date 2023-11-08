namespace DAL.Entities
{
    public class ChatMessage
    {
        public ulong Id { get; set; }

        public Guid ConversationGuid { get; set; }
        public ulong? ConversationId { get; set; }
        public Conversation? Conversation { get; set; }

        public string? SenderId { get; set; }
        public ApplicationUser? Sender { get; set; }
        public string MessageText { get; set; }

        public DateTime SentAt { get; set; }

        public MessageStatus MessageStatus { get; set; }
    }
}
