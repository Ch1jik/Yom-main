using DAL.Entities;
using DAL.Helpers.Enums;

namespace DAL.Helpers
{
    public class FilterState
    {
        public Sort? Sort { get; set; }
        public GridFilterState? Filter { get; set; }
        public int? PageNumber { get; set; }
        public int? PageSize { get; set; } = 20;
    }
    public class GridFilterState
    {
        public IEnumerable<Filter>? Filters { get; set; }
        public GridFilterLogic Logic { get; set; }
    }
    public class Filter
    {
        public string Field { get; set; }
        public GridFilterOperator Operator { get; set; }
        public string Value { get; set; }
    }
    public class Sort
    {
        public GridSortDirection Dir { get; set; }
        public string Field { get; set; }
    }
}
