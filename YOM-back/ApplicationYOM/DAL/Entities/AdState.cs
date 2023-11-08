using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Entities
{
    public enum AdState
    {
        Active = 0,
        Pending = 1,
        Deactivated = 2,
        Declined = 3
    }
}
