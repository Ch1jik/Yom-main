using AutoMapper;
using BLL.Interfaces;
using BLL.Models;
using Microsoft.AspNetCore.Mvc;
using PL.Models.HelpReport;

namespace PL.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HelpReportController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IUserHelpReportService _userHelpReportService;

        public HelpReportController(IMapper mapper, IUserHelpReportService userHelpReportService)
        {
            _mapper = mapper;
            _userHelpReportService = userHelpReportService;
        }

        [HttpPost("Create")]
        public async Task<IActionResult> CreateHelpReport(UserHelpReportModelCreate model)
        {
            try
            {
                var mappedReport = _mapper.Map<UserHelpReport>(model);
                await _userHelpReportService.CreateHelpReportAsync(mappedReport);
                return Ok("Success");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("All/ByUserId/{UserId}")]
        public async Task<IEnumerable<UserHelpReportModel>> GetAllUserReports(string UserId)
        {
            var reports = await _userHelpReportService.GetAllUserReportsAsync(UserId);
            return _mapper.Map<IEnumerable<UserHelpReportModel>>(reports);
        }
    }
}
