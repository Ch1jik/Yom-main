namespace DAL.Entities
{
    public class UserReview
    {
        public ulong Id { get; set; }
        public int Rating { get; set; }
        public string? ReviewText { get; set; }
        public string? ReceiverId { get; set; }
        public ApplicationUser? Receiver { get; set; }
        public string? SenderId { get; set; }
        public ApplicationUser? Sender { get; set; }
        public string? PhotoPaths { get; set; }
        public DateTime DateCreate { get; set; }
        public ulong? AdId { get; set; }
        public Ad? Ad { get; set; }
    }
}
