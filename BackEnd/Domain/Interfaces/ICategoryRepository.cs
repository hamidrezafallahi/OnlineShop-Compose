using OnlineShop.Domain.Entities;

namespace OnlineShop.Domain.Interfaces;

public interface ICategoryRepository : IRepository<Category>
{
    Task<IEnumerable<Category>> GetSubCategoriesAsync(int parentCategoryId);
    Task<IEnumerable<Category>> GetRootCategoriesAsync( );
    IQueryable<Category> Query();
    Task<Category> GetCategoryByIdAsync(int Id);
}
