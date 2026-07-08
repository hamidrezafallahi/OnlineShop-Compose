

namespace OnlineShop.Domain.Entities
{
    public class Brand : BaseEntity
    {
        private Brand() { }

        public string Name { get; private set; } = string.Empty;
        public string LogoUrl { get; private set; } = string.Empty;
        public string Description { get; private set; } = string.Empty;

        public ICollection<Product> Products { get; private set; } = new List<Product>();

        // ===== Factory Method =====
        public static Brand Create(string name, string description, int currentUserId)
        {
            if (string.IsNullOrWhiteSpace(name))
                throw new ArgumentException("Name cannot be empty.", nameof(name));

            

            var brand = new Brand
            {
                Name = name,
                Description = description,

            };
            brand.SetActive(true, currentUserId);
            brand.MarkCreated(currentUserId); 
            return brand;
        }

        // ===== Behavior Methods =====
        public void Update(int currentUserId,string? name, string? logoUrl, string? description,bool? isActive)
        {
            if (!string.IsNullOrWhiteSpace(name))
                Name = name;

            if (!string.IsNullOrWhiteSpace(logoUrl))
                LogoUrl = logoUrl;

            if (!string.IsNullOrWhiteSpace(description))
                Description = description;
            if (isActive.HasValue) SetActive(isActive.Value, currentUserId);
            MarkUpdated(currentUserId); 
        }

      
        
    }
}
