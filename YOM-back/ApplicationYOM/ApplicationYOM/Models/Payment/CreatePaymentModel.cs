namespace PL.Models.Payment
{
    public class CreatePaymentModel
    {
        public string? UserId { get; set; }
        public PaymentType PaymentType { get; set; }
        public PaymentSystem PaymentSystem { get; set; }
        public double PaymentAmount { get; set; }
    }
}
