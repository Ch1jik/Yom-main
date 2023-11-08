using AutoMapper;
using BLL.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace PL.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminPurchaseController : Controller
    {
        private readonly IPurchaseService _purchaseService;
        private readonly ILogger<AdminPurchaseController> _logger;

        public AdminPurchaseController(IPurchaseService purchaseService, ILogger<AdminPurchaseController> logger)
        {
            _purchaseService = purchaseService;
            _logger = logger;
        }

        [HttpGet("CountOfPurchases")]
        public async Task<int> GetCount()
        {
            try
            {
                var count = await _purchaseService.GetCountOfPurchase();
                return count;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw new Exception(ex.Message);
            }
        }
    }
}
