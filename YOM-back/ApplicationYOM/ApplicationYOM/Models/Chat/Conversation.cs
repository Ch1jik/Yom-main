namespace PL.Models.Chat
{
    public class Conversation
    {
        public ulong Id { get; set; }
        public Guid ConversationGuid { get; set; }
        public bool IsMuted { get; set; }
        public bool IsPinned { get; set; }
        public ConversationType ConversationType { get; set; }
        public bool IsBlocked { get; set; }
        public DateTime? LastMessageSentAt { get; set; }
    }
}
