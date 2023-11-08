using AutoMapper;
using BLL.Interfaces;
using BLL.Validation.Exceptions;
using Microsoft.AspNetCore.Mvc;
using PL.Models.Payment;

namespace PL.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentController : Controller
    {
        private readonly IPaymentService _paymentService;
        private readonly IMapper _mapper;
        public PaymentController(IPaymentService paymentService, IMapper mapper)
        {
            _paymentService = paymentService;
            _mapper = mapper;
        }

        [HttpGet("User")]
        public async Task<IEnumerable<PaymentModel>> GetUserPaymentsAsync()
        {
            var userId = User.Identities.FirstOrDefault().Claims.FirstOrDefault().Value;
            if (string.IsNullOrEmpty(userId))
                throw new AuthException("Something went wrong with authorizing");
            var payments = await _paymentService.GetUserPayment(userId);
            return _mapper.Map<IEnumerable<PaymentModel>>(payments);
        }

        [HttpPost]
        public async Task<IActionResult> PayAsync(CreatePaymentModel model)
        {
            try
            {
                var payment = _mapper.Map<BLL.Models.Payment>(model);
                await _paymentService.Pay(payment);
                return Ok("Success");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
