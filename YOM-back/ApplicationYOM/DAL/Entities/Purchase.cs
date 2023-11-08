namespace DAL.Entities
{
    public class Purchase
    {
        public ulong Id { get; set; }
        public ulong? AdId { get; set; }
        public Ad? Ad { get; set; }
        public string? BuyerId { get; set; }
        public ApplicationUser? Buyer { get; set; }
        public string? SellerId { get; set; }
        public ApplicationUser? Seller { get; set; }
        public DateTime PurchaseDate { get; set; }
    }
}
