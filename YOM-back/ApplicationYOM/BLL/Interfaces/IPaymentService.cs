using BLL.Models;

namespace BLL.Interfaces
{
    public interface IPaymentService
    {
        Task Pay(Payment model);

        Task<IEnumerable<Payment>> GetAllPayments();

        Task<IEnumerable<Payment>> GetPaymentsByMonth();

        Task<IEnumerable<Payment>> GetUserPayment(string userId);

        Task<double> GetTotalMonthPayments();

        Task<double> GetTotalPayments();

        Task<double> GetTotalBannerMonthPayments();

        Task<double> GetTotalPromotionMonthPayments();
    }
}
