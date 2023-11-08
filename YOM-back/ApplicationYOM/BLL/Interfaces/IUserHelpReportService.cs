using BLL.Models.Enums;
using BLL.Models;

namespace BLL.Interfaces
{
    public interface IUserHelpReportService
    {
        Task CreateHelpReportAsync(UserHelpReport model);
        Task DeleteHelpReportAsync(UserHelpReport model);
        Task<UserHelpReport> GetHelpReportAsync(ulong reportId);
        Task<IEnumerable<UserHelpReport>> GetAllUserReportsAsync(string userId);

        Task<IEnumerable<UserHelpReport>> GetAllUserReportsByStatusAsync(ReportStatus reportStatus,
            GridSortDirection gridSortDirection, int? pageNumber);
        Task UpdateReportStatusAsync(UserHelpReport model);
    }
}
