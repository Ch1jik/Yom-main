using DAL.Helpers.Enums;
using System.Linq.Dynamic.Core;
using System.Text;

namespace DAL.Helpers
{
    public static class FilterHelper
    {
        public static IQueryable<T> OrderByState<T>(this IQueryable<T> query, FilterState state)
        {
            if (state.Sort == null)
            {
                return query;
            }

            var orderBy = new StringBuilder();

            var direction = state.Sort.Dir == GridSortDirection.asc ? "asc" : "desc";
            orderBy.Append($"{state.Sort.Field} {direction},");

            orderBy.Remove(orderBy.Length - 1, 1);

            return query.OrderBy(orderBy.ToString());
        }

        public static IQueryable<T> FilterByState<T>(this IQueryable<T> query, FilterState state)
        {
            if (state.Filter is null || !state.Filter.Filters.Any())
            {
                return query;
            }

            var predicate = string.Empty;

            foreach (var filterItem in state.Filter.Filters)
            {
                var operatorString = GetOperatorString(filterItem.Operator);
                if (!string.IsNullOrEmpty(predicate))
                {
                    predicate += $" {state.Filter.Logic} ";
                }

                predicate += $"{filterItem.Field} {operatorString} \"{filterItem.Value}\"";
            }
            if (predicate.EndsWith(" and") || predicate.EndsWith(" or"))
            {
                predicate = predicate.Substring(0, predicate.Length - 3);
            }
            //predicate = predicate.TrimEnd(' ', '&');
            return query.Where(predicate);
        }

        public static IQueryable<T> ToPagedListAsync<T>(this IQueryable<T> query, FilterState state)
        {
            if (state is { PageNumber: not null, PageSize: not null })
            {
                if(state.PageNumber == 0)
                    state.PageNumber = 1;
                query = query.Skip((int)((state.PageNumber - 1) * state.PageSize)).Take((int)state.PageSize);
            }
            return query;
        }

        private static string GetOperatorString(GridFilterOperator filterOperator)
        {
            return filterOperator switch
            {
                GridFilterOperator.eq => "==",
                GridFilterOperator.neq => "!=",
                GridFilterOperator.contains => "Contains",
                GridFilterOperator.isnull => "IsNull",
                GridFilterOperator.isnotnull => "IsNotNull",
                GridFilterOperator.doesnotcontain => "NotContains",
                GridFilterOperator.startswith => "StartsWith",
                GridFilterOperator.endswith => "EndsWith",
                GridFilterOperator.gt => ">",
                GridFilterOperator.gte => ">=",
                GridFilterOperator.lt => "<",
                GridFilterOperator.lte => "<=",
                _ => throw new Exception($"Unknown operator: {filterOperator}")
            };
        }
    }
}
