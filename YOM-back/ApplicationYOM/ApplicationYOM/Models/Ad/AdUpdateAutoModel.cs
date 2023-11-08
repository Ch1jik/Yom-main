namespace PL.Models.Ad
{
    public class AdUpdateAutoModel
    {
        public ulong Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public string City { get; set; }
        public string? Address { get; set; }
        public AdCurrency Currency { get; set; }
        public ProductState ProductState { get; set; }
        public int CategoryId { get; set; }
        public int SubCategoryId { get; set; }
        public Auto? Auto { get; set; }
    }
}
