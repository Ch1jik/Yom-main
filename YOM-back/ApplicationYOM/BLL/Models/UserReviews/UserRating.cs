using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Models.UserReviews
{
    public class UserRating
    {
        public double Average { get; set; }
        public int CountOfFive { get; set; }
        public int CountOfFour { get; set; }
        public int CountOfThree { get; set; }
        public int CountOfTwo { get; set; }
        public int CountOfOne { get; set; }
    }
}
