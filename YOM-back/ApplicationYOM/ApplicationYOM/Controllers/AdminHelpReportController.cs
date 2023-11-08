using AutoMapper;
using BLL.Interfaces;
using BLL.Models;
using Microsoft.AspNetCore.Mvc;
using PL.Models.Filtering;
using PL.Models.HelpReport;

namespace PL.Controllers
{
    [ApiController]
    [Route("api/Admin/HelpReport")]
    public class AdminHelpReportController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IUserHelpReportService _userHelpReportService;

        public AdminHelpReportController(IMapper mapper, IUserHelpReportService userHelpReportService)
        {
            _mapper = mapper;
            _userHelpReportService = userHelpReportService;
        }

        [HttpGet("ByReportId/{ReportId}")]
        public async Task<UserHelpReportModelCreate> GetHelpReport(ulong ReportId)
        {
            var reports = await _userHelpReportService.GetHelpReportAsync(ReportId);
            return _mapper.Map<UserHelpReportModelCreate>(reports);
        }

        [HttpGet("All/ByUserId/{UserId}")]
        public async Task<IEnumerable<UserHelpReportModel>> GetAllUserReports(string UserId)
        {
            var reports = await _userHelpReportService.GetAllUserReportsAsync(UserId);
            return _mapper.Map<IEnumerable<UserHelpReportModel>>(reports);
        }

        [HttpGet("All/ByReportStatus")]
        public async Task<IEnumerable<UserHelpReportModel>> GetAllByReports(ReportStatus reportStatus, GridSortDirection sortDirection, int? pageNumber)
        {
            var mappedReportStatus = _mapper.Map<BLL.Models.Enums.ReportStatus>(reportStatus);
            var mappedSortDirection = _mapper.Map<BLL.Models.Enums.GridSortDirection>(sortDirection);
            var reports = await _userHelpReportService.GetAllUserReportsByStatusAsync
                (mappedReportStatus, mappedSortDirection, pageNumber);
            return _mapper.Map<IEnumerable<UserHelpReportModel>>(reports);
        }

        [HttpPut("ChangeStatus")]
        public async Task<IActionResult> ChangeReportStatus(UpdateReportStatusModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Incorrect data");
            }

            try
            {
                var mappedReport = _mapper.Map<UserHelpReport>(model);
                await _userHelpReportService.UpdateReportStatusAsync(mappedReport);
                return Ok("Success");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
