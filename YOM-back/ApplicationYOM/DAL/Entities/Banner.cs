namespace DAL.Entities
{
    public class Banner
    {
        public ulong Id { get; set; }
        public string CompanyName { get; set; }
        public string Description { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Header { get; set; }
        public DateTime DateExpired { get; set; }
        public DateTime DateStarted { get; set; }
        public BannerState BannerState { get; set; }
        public string PhotoPaths { get; set; }
        public string LinkToCompany { get; set; }
        public ulong ClicksCount { get; set; }
        public BannerAdvertisementPlan BannerAdvertisementPlan { get; set; }
    }
}
