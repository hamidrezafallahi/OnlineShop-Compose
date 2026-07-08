using OnlineShop.Domain.Entities;
namespace Domain.Entities
{
    public class ProductSpecification : BaseEntity
    {
        private ProductSpecification() { }

        public int ProductId { get; private set; }
        public Product Product { get; private set; }

        public string Key { get; private set; } = string.Empty;
        public string Value { get; private set; } = string.Empty;

        public static ProductSpecification Create(
            int productId,
            string key,
            string value)
        {
            if (string.IsNullOrWhiteSpace(key))
                throw new ArgumentException("Key cannot be empty.");
            if (string.IsNullOrWhiteSpace(value))
                throw new ArgumentException("value cannot be empty.");

            var spec = new ProductSpecification
            {
                ProductId = productId,
                Key = key,
                Value=value
            };

            return spec;
        }

        public void Update(string key, string value, int userId)
        {
            if (key is not null)
                Key = key;
            if (value is not null)
                Value = value;
            MarkUpdated(userId);
        }
    }
}
