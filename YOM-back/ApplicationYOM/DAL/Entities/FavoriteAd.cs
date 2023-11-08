namespace DAL.Entities
{
    public class FavoriteAd
    {
        public ulong Id { get; set; }
        public string UserId { get; set; }
        public virtual ApplicationUser User { get; set; }
        public ulong AdId { get; set; }
        public virtual Ad Ad { get; set; }
        public DateTime DateAdded { get; set; }
    }
}
