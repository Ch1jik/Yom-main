using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Models.Enums
{
    public enum GridSortDirection
    {
        asc,
        desc
    }
    public enum GridFilterOperator
    {
        eq,
        neq,
        contains,
        isnull,
        isnotnull,
        doesnotcontain,
        startswith,
        endswith,
        gt,
        gte,
        lt,
        lte
    }

    public enum GridFilterLogic
    {
        and,
        or
    }
}
