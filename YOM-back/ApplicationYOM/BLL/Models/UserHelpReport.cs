using BLL.Models.Enums;

namespace BLL.Models
{
    public class UserHelpReport
    {
        public ulong Id { get; set; }
        public string UserId { get; set; }
        public string Description { get; set; }
        public DateTime DateCreated { get; set; }
        public ReportStatus ReportStatus { get; set; }
    }
}
