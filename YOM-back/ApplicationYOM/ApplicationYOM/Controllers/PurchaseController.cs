using AutoMapper;
using BLL.Interfaces;
using Microsoft.AspNetCore.Mvc;
using PL.Models.Purchase;

namespace PL.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PurchaseController : Controller
    {
        private readonly IPurchaseService _purchaseService;
        private readonly ILogger<PurchaseController> _logger;
        private readonly IMapper _mapper;

        public PurchaseController(IPurchaseService purchaseService, ILogger<PurchaseController> logger, IMapper mapper)
        {
            _purchaseService = purchaseService;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet("AllUserPurchase")]
        public async Task<IEnumerable<PurchaseModel>> GetAllUserPurchaseAsync(string userId, int? pageNumber, int? pageSize)
        {
            var result = await _purchaseService.GetUserPurchase(userId, pageNumber, pageSize);
            return _mapper.Map<IEnumerable<PurchaseModel>>(result);
        }

        [HttpGet("AllUserSales")]
        public async Task<IEnumerable<SellerModel>> GetAllUserSalesAsync(string userId, int? pageNumber, int? pageSize)
        {
            var result = await _purchaseService.GetUserSales(userId, pageNumber, pageSize);
            return _mapper.Map<IEnumerable<SellerModel>>(result);
        }

        [HttpPost]
        public async Task<IActionResult> MakePurchaseAsync(MakePurchaseModel model)
        {
            try
            {
                var mappedPurchase = _mapper.Map<BLL.Models.Purchase>(model);
                await _purchaseService.MakePurchase(mappedPurchase);
                return Ok("Success");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return Conflict(ex.Message);
            }
        }

        [HttpDelete("{Id}")]
        public async Task<IActionResult> DeletePurchaseAsync(ulong Id)
        {
            try
            {
                await _purchaseService.DeletePurchase(Id);
                return Ok("Success");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return Conflict(ex.Message);
            }
        }
    }
}
