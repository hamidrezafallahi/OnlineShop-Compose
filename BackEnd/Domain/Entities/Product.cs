using Domain.Entities;
using OnlineShop.Domain.ValueObjects;


namespace OnlineShop.Domain.Entities
{
    public class Product : BaseEntity
    {
        private Product() { }

        public string Name { get; private set; } = string.Empty;
        public string? Description { get; private set; }

        // ==== Category ====
        public int CategoryId { get; private set; }
        public Category Category { get; private set; }

        // ==== Brand ====
        public int? BrandId { get; private set; }
        public Brand? Brand { get; private set; }

        // ==== Images ====

        public ICollection<ProductImage> Images { get; private set; } = new List<ProductImage>();



        // ==== Specifications ====

        public ICollection<ProductSpecification> Specifications { get; private set; } = new List<ProductSpecification>();
        public ICollection<ProductOffers> ProductOffers { get; private set; } = new List<ProductOffers>();

        // ===== Dimensions =====
        public ProductDimensions? Dimensions { get; private set; }
 

        // ===== Factory Method =====
        public static Product Create(
            string name,
            string description,
            int categoryId,
            int brandId,
            ProductDimensions dimensions,
            int currentUserId) 

        {
            if (string.IsNullOrWhiteSpace(name))
                throw new ArgumentException("Product name cannot be empty.", nameof(name));

            var product = new Product
            {
                Name = name,
                CategoryId = categoryId,
                BrandId = brandId,
                Description = description,
                Dimensions = dimensions
            };

            product.MarkCreated(currentUserId);

            return product;
        }

        // ===== Behavior Methods =====
        public void Update(
            int currentUserId,
            string? name,
            string? description,
            int? categoryId,
            int? brandId,
            ProductDimensions? dimensions
            )
        {
            if (!string.IsNullOrWhiteSpace(name))
                Name = name;
            if (categoryId.HasValue)
                CategoryId = categoryId.Value;

            if (brandId.HasValue)
                BrandId = brandId.Value;

            if (description != null)
                Description = description;

            if (dimensions != null)
                Dimensions = dimensions;

            MarkUpdated(currentUserId);
        }


        public void AddImage(ProductImage image, int currentUserId)
        {
            if (image == null)
                throw new ArgumentNullException(nameof(image));

            Images.Add(image);
            MarkUpdated(currentUserId);
        }

        public void RemoveImage(ProductImage image, int currentUserId)
        {
            if (image == null)
                throw new ArgumentNullException(nameof(image));

            Images.Remove(image);
            MarkUpdated(currentUserId);
        }
 

        public void SetDimensions(ProductDimensions dimensions)
        {
            Dimensions = dimensions;

        }

        public void AddSpecification(string key, string value)
        {
            if (Specifications.Any(s => s.Key == key))
                throw new InvalidOperationException("Specification already exists.");

            Specifications.Add(
                ProductSpecification.Create(this.Id, key, value)
            );

        }

        public void RemoveSpecification(string key, int userId)
        {
            var spec = Specifications.FirstOrDefault(s => s.Key == key);
            if (spec != null)
            {
                Specifications.Remove(spec);
                MarkUpdated(userId);
            }
        }

    }
}
