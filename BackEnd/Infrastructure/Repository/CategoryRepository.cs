using Microsoft.EntityFrameworkCore;
using OnlineShop.Domain.Entities;
using OnlineShop.Domain.Interfaces;
using OnlineShop.Infrastructure.Persistence;

namespace OnlineShop.Infrastructure.Repositories
{
    public class CategoryRepository : Repository<Category>, ICategoryRepository
    {
        public CategoryRepository(AppDbContext context) : base(context)
        {
        }
        public async Task<IEnumerable<Category>> GetSubCategoriesAsync(int parentCategoryId)
        {
            return await Query(c => c.ParentCategoryId == parentCategoryId)
               .ToListAsync();
        }
        public async Task<IEnumerable<Category>> GetRootCategoriesAsync()
        {
            return await Query(c => c.ParentCategoryId == null)
                 .AsNoTracking()
                 .ToListAsync();
        }


        public IQueryable<Category> Query()
        {
            return base.Query();
        }

        public  async Task<Category?> GetCategoryByIdAsync(int id)
        {
            return await Query(c => c.Id == id)
                .Include(c => c.SubCategories)
                .Include(c => c.ParentCategory)
                .FirstOrDefaultAsync();
        }

    }
}
