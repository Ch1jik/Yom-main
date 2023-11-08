namespace DAL.Entities
{
    public class LastViewedHistory
    {
        public ulong Id { get; set; }
        public ulong AdId { get; set; }
        public Ad Ad { get; set; }
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
        public DateTime LastSeenAt { get; set; }
    }
}
