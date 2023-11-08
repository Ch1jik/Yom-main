using DAL.Data;
using DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using DAL.Interfaces;
using Microsoft.EntityFrameworkCore;
using static System.Collections.Specialized.BitVector32;
using DAL.Exceptions;
using DAL.Helpers;

namespace DAL.Repositories
{
    public class SubCategoryRepository : IRepository<SubCategory>
    {
        private readonly YomContext _context;

        public SubCategoryRepository(YomContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<SubCategory>> GetAll()
        {
            return await _context.SubCategories.ToListAsync();
        }

        public async Task<SubCategory?> GetByParamAsync(Expression<Func<SubCategory?, bool>> filterExpression)
        {
            return await _context.SubCategories.FirstOrDefaultAsync(filterExpression) ?? null;
        }

        public void Add(SubCategory entity)
        {
            try
            {
                _context.SubCategories.Add(entity);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task DeleteById(ulong id)
        {
            var categoryToDelete = await _context.SubCategories.FirstOrDefaultAsync(subCategory => subCategory.Id == (int)id);
            if (categoryToDelete is not null)
                _context.SubCategories.Remove(categoryToDelete);
        }

        public void Update(SubCategory entity)
        {
            _context.SubCategories.Update(entity);
        }

        public async Task<IEnumerable<SubCategory>> GetAllByQueryAsync(FilterState query)
        {
            var result = _context.SubCategories.AsQueryable();
            var filteredResult = result.OrderByState(query)
                .FilterByState(query).ToPagedListAsync(query);
            return await filteredResult.ToListAsync();
        }
    }
}
