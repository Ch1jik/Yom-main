using System.Collections.ObjectModel;
using BLL.Models;
using BLL.Models.Enums;
using BLL.Validation.Exceptions;

namespace BLL.Helpers
{
    public class FilterExtension
    {
        public static FilterState CreateSingleFilter(string? filterField, GridFilterOperator? gridFilterOperator, string? filterValue, // filter
            GridSortDirection? gridSortDirection, string? fieldSort, // sort
            int? pageNumber, int? pageSize = 20) // pagination
        {
            try
            {
                var sort = new Sort();
                var filterState = new GridFilterState();
                if (filterField is not null && gridFilterOperator is not null && filterValue is not null)
                {
                    var filter = new Filter { Field = filterField, Operator = (GridFilterOperator)gridFilterOperator, Value = filterValue };
                    filterState.Filters = new List<Filter>{ filter };
                }

                if (gridSortDirection is not null && fieldSort is not null)
                {
                    sort.Dir = (GridSortDirection)gridSortDirection;
                    sort.Field = fieldSort;
                }
                return new FilterState { Sort = sort, Filter = filterState, PageNumber = pageNumber, PageSize = pageSize };
            }
            catch (Exception ex)
            {
                throw new YOMException(ex.Message);
            }
        }
    }
}
