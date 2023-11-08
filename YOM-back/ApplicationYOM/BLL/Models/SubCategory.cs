using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Models
{
    public class SubCategory
    {
        public int? Id { get; set; }
        public int CategoryId { get; set; }
        public string? Title { get; set; }
        public string? Section { get; set; }
        public ulong Clicks { get; set; }
    }
}
