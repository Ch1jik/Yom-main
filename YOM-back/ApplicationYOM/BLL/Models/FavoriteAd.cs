using BLL.Models.Enums;

namespace BLL.Models
{
    public class FavoriteAd
    {
        public ulong Id { get; set; }
        public string UserId { get; set; }
        public ulong AdId { get; set; }
        public string PhotoPaths { get; set; }
        public string Title { get; set; }
        public double Price { get; set; }
        public DateTime DateAdded {get; set; }
    }
}
