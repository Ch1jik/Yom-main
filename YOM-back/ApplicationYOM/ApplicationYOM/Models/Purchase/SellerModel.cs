using PL.Models.Ad;

namespace PL.Models.Purchase
{
    public class SellerModel
    {
        public ulong Id { get; set; }
        public ulong AdId { get; set; }
        public string PhotoPaths { get; set; }
        public string Title { get; set; }
        public string City { get; set; }
        public string? Address { get; set; }
        public ulong AdPopularity { get; set; }
        public ulong PhoneClicks { get; set; }
        public double Price { get; set; }
        public string SellerId { get; set; }
        public DateTime PurchaseDate { get; set; }
    }
}
