using DAL.Entities;

namespace DAL.Interfaces
{
    public interface IPaymentRepository
    {
        void Pay(Payment model);
        Task<IEnumerable<Payment>> GetAllPayments();

        Task<IEnumerable<Payment>> GetPaymentsByMonth();

        Task<IEnumerable<Payment>> GetUserPayment(string userId);

        Task<double> GetTotalMonthPayments();

        Task<double> GetTotalPayments();

        Task<double> GetTotalBannerMonthPayments();

        Task<double> GetTotalPromotionMonthPayments();
    }
}
