using OnlineShop.Domain.Entities;

namespace OnlineShop.Domain.Interfaces
{
    public interface IProductRepository : IRepository<Product>
    {
        // ===== Read =====

        Task<Product?> GetProductByIdAsync(int productId);

        Task<Product?> GetProductWithDetailsAsync(int productId);
        // ↑ شامل Specs + Images + Brand + Category + Dimensions

        Task<IEnumerable<Product>> GetAllProductsAsync();
        Task<IEnumerable<Product>> GetProductsByCategoryIdAsync(int categoryId);
        Task<IEnumerable<Product>> GetProductsByBrandIdAsync(int brandId);
        //Task<IEnumerable<Product>> GetProductsIncludesTagsAndBrandsAndCategoriesByUserIdAsync(int userId);
        //Task<IEnumerable<Product>> GetDiscountedProductsAsync();
        Task<bool> ExistsByNameAndBrandAsync(string name, int? brandId);

        Task<IEnumerable<Product>> SearchByNameAsync(string keyword);

        // ===== Specifications =====

        Task AddSpecificationAsync(
            int productId,
            string key,
            string value,
            int userId);

        Task RemoveSpecificationAsync(
            int productId,
            string key,
            int userId);

        // ===== Dimensions =====

        Task SetDimensionsAsync(
            int productId,
            decimal width,
            decimal height,
            decimal depth,
            decimal weight,
            int userId);
    }

}
