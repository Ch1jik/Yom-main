namespace PL.Models.Chat
{
    public class ChatMessageModel
    {
        public ulong Id { get; set; }
        public string SenderId { get; set; }
        public string MessageText { get; set; }
        public DateTime SentAt { get; set; }
        public MessageStatus MessageStatus { get; set; }
    }
}
