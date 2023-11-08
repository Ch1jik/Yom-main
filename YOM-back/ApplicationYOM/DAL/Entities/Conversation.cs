namespace DAL.Entities
{
    public class Conversation
    {
        public ulong Id { get; set; }
        public Guid ConversationGuid { get; set; }
        public bool IsBlocked { get; set; }
        public DateTime? LastMessageSentAt { get; set; }
        public ICollection<ChatMessage>? Messages { get; set; }
        public ICollection<UserConversation> UserConversations { get; set; }
    }
}
