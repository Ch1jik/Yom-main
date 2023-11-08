using System.ComponentModel.DataAnnotations;

namespace PL.Models.Ad
{
    public class AdCreateHouseModel
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public string City { get; set; }
        public string? Address { get; set; }
        public AdCurrency Currency { get; set; }
        public AdType AdType { get; set; }
        public ProductState ProductState { get; set; }
        public int CategoryId { get; set; }
        public int SubCategoryId { get; set; }
        public string UserId { get; set; }
        [EmailAddress(ErrorMessage = "Please enter a valid email address")]
        public string Email { get; set; }
        [RegularExpression(@"(?:\d{1,3})?[-. (]?\d{1,4}[-. )]?\d{1,4}[-. ]?\d{1,4}$$")]
        public string PhoneNumber { get; set; }
        public House? House { get; set; }
    }
}
