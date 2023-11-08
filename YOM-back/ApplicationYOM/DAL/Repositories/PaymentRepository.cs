using DAL.Data;
using DAL.Entities;
using DAL.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories
{
    public class PaymentRepository : IPaymentRepository
    {
        private readonly YomContext _context;

        public PaymentRepository(YomContext context)
        {
            _context = context;
        }

        public void Pay(Payment model)
        {
            try
            {
                _context.Payments.Add(model);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<IEnumerable<Payment>> GetAllPayments()
        {
            return await _context.Payments.ToListAsync();
        }

        public async Task<IEnumerable<Payment>> GetPaymentsByMonth()
        {
            var startDate = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1);
            var endDate = startDate.AddMonths(1);
            var result = _context.Payments.AsQueryable().Where(x => x.PaymentTime >= startDate &&
                                                x.PaymentTime <= endDate);
            return await result.ToListAsync();
        }

        public async Task<IEnumerable<Payment>> GetUserPayment(string userId)
        {
            var result = _context.Payments.AsQueryable().Where(u => u.UserId == userId);
            return await result.ToListAsync();
        }

        public async Task<double> GetTotalMonthPayments()
        {
            var startDate = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1);
            var endDate = startDate.AddMonths(1);
            var result = _context.Payments.AsQueryable()
                .Where(p => p.PaymentTime >= startDate && p.PaymentTime < endDate)
                .SumAsync(p => p.PaymentAmount);
            return await result;
        }

        public async Task<double> GetTotalPayments()
        {
            return await _context.Payments
                .SumAsync(p => p.PaymentAmount);
        }

        public async Task<double> GetTotalBannerMonthPayments()
        {
            return await _context.Payments
                .Where(p=> p.PaymentType == PaymentType.Banner)
                .SumAsync(p => p.PaymentAmount);
        }

        public async Task<double> GetTotalPromotionMonthPayments()
        {
            return await _context.Payments
                .Where(p => p.PaymentType == PaymentType.AdPromotion)
                .SumAsync(p => p.PaymentAmount);
        }
    }
}
