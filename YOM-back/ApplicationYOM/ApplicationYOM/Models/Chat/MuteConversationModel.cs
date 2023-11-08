namespace PL.Models.Chat
{
    public class MuteConversationModel
    {
        public bool IsMuted { get; set; }
        public Guid ConversationGuid { get; set; }
        public string UserId { get; set; }
    }
}
