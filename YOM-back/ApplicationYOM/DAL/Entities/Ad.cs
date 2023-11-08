using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Entities
{
    public class Ad
    {
        public ulong Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public string City { get; set; }
        public string? Address { get; set; }
        public AdCurrency Currency { get; set; }
        public AdType AdType { get; set; }
        public AdState AdState { get; set; }
        public ProductState ProductState { get; set; }
        public bool IsPaid { get; set; }
        public AdvertisementPlan? AdvertisementPlan { get; set; }
        public DateTime? PaidUntil { get; set; }
        public int CategoryId { get; set; }
        public ulong? AdPopularity { get; set; }
        public virtual Category Category { get; set; }
        public int SubCategoryId { get; set; }
        public virtual SubCategory SubCategory { get; set; }
        public string? PathToPhotos { get; set; }
        public string UserId { get; set; }
        public virtual ApplicationUser User { get; set; }
        public string? PhoneNumber { get; set; }
        public ulong PhoneClicks { get; set; }
        public string? Email { get; set; }
        public House? House { get; set; }
        public Auto? Auto { get; set; }
        public ICollection<LastViewedHistory> LastViewedHistories { get; set; }
    }
}
