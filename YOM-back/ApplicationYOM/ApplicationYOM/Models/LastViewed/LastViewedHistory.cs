namespace PL.Models.LastViewed
{
    public class LastViewedHistory
    {
        public ulong Id { get; set; }
        public ulong AdId { get; set; }
        public string PhotoPaths { get; set; }
        public string Title { get; set; }
        public double Price { get; set; }
        public string UserId { get; set; }
        public DateTime LastSeenAt { get; set; }
    }
}
