namespace PL.Models.HelpReport
{
    public class UserHelpReportModel
    {
        public ulong Id { get; set; }
        public string UserId { get; set; }
        public string Description { get; set; }
        public DateTime DateCreated { get; set; }
        public ReportStatus ReportStatus { get; set; }
    }
}
