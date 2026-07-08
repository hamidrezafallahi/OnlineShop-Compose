namespace OnlineShop.Domain.Entities
{
    public class Category : BaseEntity
    {
        private Category() { } 

        public string PersianName { get; private set; } = string.Empty;
        public string EnglishName { get; private set; } = string.Empty;

        public int? ParentCategoryId { get; private set; }
        public string ImageUrl { get; private set; } = string.Empty;
        public string CategoryPersianDesc { get; private set; }
        public string CategoryEnglishDesc { get; private set; }
        public bool IsShowInLanding { get; private set; }=false;


        public Category? ParentCategory { get; private set; }
        private readonly List<Category> _subCategories = new();
        public IReadOnlyCollection<Category> SubCategories => _subCategories.AsReadOnly();

        private readonly List<Product> _products = new();
        public IReadOnlyCollection<Product> Products => _products.AsReadOnly();

        // ===== Factory Method =====
        public static Category Create(string persianName, string persianDesc, string englishName, string englishDesc, bool isShowInLanding, bool? isActive, int? parentCategoryId, int currentUserId)
        {
            if (string.IsNullOrWhiteSpace(persianName))
                throw new ArgumentException("Category persianName cannot be empty.", nameof(persianName));

            var category = new Category
            {
                PersianName = persianName,
                EnglishName = englishName,
                CategoryPersianDesc = persianDesc,
                CategoryEnglishDesc = englishDesc,
                IsShowInLanding= isShowInLanding,
                ParentCategoryId = parentCategoryId
                
            };
            if (isActive.HasValue)
                category.SetActive(isActive.Value, currentUserId);


            category.MarkCreated(currentUserId);
            return category;
        }

        // ===== Behavior Methods =====
        public void Update(string? persianName, string? persianDesc, string? englishName, string? englishDesc, string? imageUrl, bool? showInLanding, int? parentCategoryId, int currentUserId)
        {
            if (!string.IsNullOrWhiteSpace(persianName))
                PersianName = persianName;
            if (!string.IsNullOrWhiteSpace(persianDesc))
                CategoryPersianDesc = persianDesc;
            if (!string.IsNullOrWhiteSpace(englishName))
                EnglishName = englishName;
            if (!string.IsNullOrWhiteSpace(englishDesc))
                CategoryEnglishDesc = englishDesc;
            if (!string.IsNullOrWhiteSpace(imageUrl))
                ImageUrl = imageUrl;
            if (showInLanding.HasValue)
                IsShowInLanding = showInLanding.Value;
            if (parentCategoryId.HasValue)
                ParentCategoryId = parentCategoryId.Value;
            MarkUpdated(currentUserId);
        }

        public void AddSubCategory(Category subCategory, int currentUserId)
        {
            if (subCategory is null)
                throw new ArgumentNullException(nameof(subCategory));
            if (!_subCategories.Contains(subCategory))
                _subCategories.Add(subCategory);
            MarkUpdated(currentUserId);
        }

        public void RemoveSubCategory(Category subCategory, int currentUserId)
        {
            if (subCategory is null)
                throw new ArgumentNullException(nameof(subCategory));

            _subCategories.Remove(subCategory);
            MarkUpdated(currentUserId);
        }

        public void AddProduct(Product product, int currentUserId)
        {
            if (product is null)
                throw new ArgumentNullException(nameof(product));

            _products.Add(product);
            MarkUpdated(currentUserId);
        }

        public void RemoveProduct(Product product, int currentUserId)
        {
            if (product is null)
                throw new ArgumentNullException(nameof(product));

            _products.Remove(product);
            MarkUpdated(currentUserId);
        }

        public void Delete(int currentUserId)
        {
            foreach (var sub in _subCategories)
            {
                sub.Delete(currentUserId);
            }

            MarkDeleted(currentUserId);
        }
    }
}
