namespace PL.Models.Payment
{
    public class PaymentModel
    {
        public string? UserId { get; set; }
        public PaymentType PaymentType { get; set; }
        public PaymentSystem PaymentSystem { get; set; }
        public DateTime PaymentTime { get; set; }
        public DateTime PaidUntil { get; set; }
        public double PaymentAmount { get; set; }
    }
}
