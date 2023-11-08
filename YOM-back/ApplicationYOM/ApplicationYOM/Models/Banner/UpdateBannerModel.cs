using System.ComponentModel.DataAnnotations;

namespace PL.Models.Banner
{
    public class UpdateBannerModel
    {
        public ulong Id { get; set; }
        public string CompanyName { get; set; }
        public string Description { get; set; }
        [EmailAddress(ErrorMessage = "Please enter a valid email address")]
        public string Email { get; set; }
        [RegularExpression(@"(?:\d{1,3})?[-. (]?\d{1,4}[-. )]?\d{1,4}[-. ]?\d{1,4}$$", ErrorMessage = "Please enter valid phone number")]
        public string PhoneNumber { get; set; }
        public BannerState BannerState { get; set; }
        public string Header { get; set; }
        public string LinkToCompany { get; set; }
        public IFormFile Photo { get; set; }
        public BannerAdvertisementPlan BannerAdvertisementPlan { get; set; }
    }
}
