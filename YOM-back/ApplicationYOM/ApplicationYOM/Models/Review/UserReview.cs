namespace PL.Models.Review
{
    public class UserReview
    {
        public ulong Id { get; set; }
        public int Rating { get; set; }
        public string SenderUserName { get; set; }
        public string? SenderAvatarPath { get; set; }
        public string? ReviewText { get; set; }
        public string ReceiverId { get; set; }
        public string SenderId { get; set; }
        public IEnumerable<string>? Photos { get; set; }
        public DateTime DateCreate { get; set; }
        public ulong AdId { get; set; }
        public string AdTitle { get; set; }
    }
}
