namespace DAL.Entities
{
    public class UserConversation
    {
        public ulong Id { get; set; }
        public ConversationType ConversationType { get; set; }
        public string? UserId { get; set; }
        public ApplicationUser? User { get; set; }
        public ulong ConversationId { get; set; }
        public Conversation Conversation { get; set; }
        public bool IsPinned { get; set; }
        public bool IsMuted { get; set; }
        public bool IsBlocked { get; set; }
        public string? RecipientId { get; set; }
        public string? LastMessageText { get; set; }
        public ApplicationUser? Recipient { get; set; }
    }
}
