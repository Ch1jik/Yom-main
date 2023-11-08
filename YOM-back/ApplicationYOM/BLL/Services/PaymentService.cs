using AutoMapper;
using BLL.Interfaces;
using BLL.Models;
using BLL.Validation.Exceptions;
using DAL.Interfaces;

namespace BLL.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public PaymentService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task Pay(Payment model)
        {
            try
            {
                var payment = _mapper.Map<DAL.Entities.Payment>(model);
                _unitOfWork.PaymentRepository.Pay(payment);
                await _unitOfWork.SaveAsync();
            }
            catch (Exception ex)
            {
                throw new YOMException(ex.Message);
            }
        }

        public async Task<IEnumerable<Payment>> GetAllPayments()
        {
            var result = await _unitOfWork.PaymentRepository.GetAllPayments();
            return _mapper.Map<IEnumerable<Payment>>(result);
        }

        public async Task<IEnumerable<Payment>> GetPaymentsByMonth()
        {
            var result = await _unitOfWork.PaymentRepository.GetPaymentsByMonth();
            return _mapper.Map<IEnumerable<Payment>>(result);
        }

        public async Task<IEnumerable<Payment>> GetUserPayment(string userId)
        {
            var result = await _unitOfWork.PaymentRepository.GetUserPayment(userId);
            return _mapper.Map<IEnumerable<Payment>>(result);
        }

        public async Task<double> GetTotalMonthPayments()
        {
            return await _unitOfWork.PaymentRepository.GetTotalMonthPayments();
        }

        public async Task<double> GetTotalPayments()
        {
            return await _unitOfWork.PaymentRepository.GetTotalPayments();
        }

        public async Task<double> GetTotalBannerMonthPayments()
        {
            return await _unitOfWork.PaymentRepository.GetTotalBannerMonthPayments();
        }

        public async Task<double> GetTotalPromotionMonthPayments()
        {
            return await _unitOfWork.PaymentRepository.GetTotalPromotionMonthPayments();
        }
    }
}
