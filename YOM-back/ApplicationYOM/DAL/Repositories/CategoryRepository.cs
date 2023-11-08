using DAL.Entities;
using DAL.Interfaces;
using System.Linq.Expressions;
using DAL.Data;
using Microsoft.EntityFrameworkCore;
using DAL.Exceptions;
using DAL.Helpers;

namespace DAL.Repositories
{
    public class CategoryRepository : IRepository<Category>
    {
        private readonly YomContext _context;

        public CategoryRepository(YomContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Category>> GetAll()
        {
            return await _context.Categories.ToListAsync();
        }

        public async Task<Category?> GetByParamAsync(Expression<Func<Category?, bool>> filterExpression)
        {
            return await _context.Categories.FirstOrDefaultAsync(filterExpression) ?? null;
        }

        public void Add(Category entity)
        {
            try
            {
                _context.Categories.Add(entity);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task DeleteById(ulong id)
        {
            var categoryToDelete = await _context.Categories.FirstOrDefaultAsync(category => category.Id == (int)id);
            if (categoryToDelete is not null)
                _context.Categories.Remove(categoryToDelete);
        }

        public void Update(Category entity)
        {
            _context.Categories.Update(entity);
        }

        public async Task<IEnumerable<Category>> GetAllByQueryAsync(FilterState query)
        {
            var result = _context.Categories.AsQueryable();
            var filteredResult = result.OrderByState(query)
                .FilterByState(query).ToPagedListAsync(query);
            return await filteredResult.ToListAsync();
        }
    }
}
