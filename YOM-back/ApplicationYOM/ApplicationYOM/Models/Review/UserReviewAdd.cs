namespace PL.Models.Review
{
    public class UserReviewAdd
    {
        public int Rating { get; set; }
        public string? ReviewText { get; set; }
        public string ReceiverId { get; set; }
        public string SenderId { get; set; }
        public ulong AdId { get; set; }
        public IEnumerable<IFormFile>? Photos { get; set; }
    }
}
