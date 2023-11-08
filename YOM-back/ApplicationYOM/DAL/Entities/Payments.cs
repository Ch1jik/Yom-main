namespace DAL.Entities
{
    public class Payment
    {
        public ulong Id { get; set; }
        public string? UserId { get; set; }
        public ApplicationUser? User { get; set; }
        public PaymentType PaymentType { get; set; }
        public PaymentSystem PaymentSystem { get; set; }
        public DateTime PaymentTime { get; set; }
        public DateTime PaidUntil { get; set; }
        public double PaymentAmount { get; set; }
    }
}
