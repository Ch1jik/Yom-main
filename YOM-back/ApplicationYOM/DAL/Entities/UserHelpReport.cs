using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Entities
{
    public class UserHelpReport
    {
        public ulong Id { get; set; }
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
        public string Description { get; set; }
        public DateTime DateCreated { get; set; }
        public ReportStatus ReportStatus { get; set; }
    }
}
