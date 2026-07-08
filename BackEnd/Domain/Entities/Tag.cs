

namespace OnlineShop.Domain.Entities
{
    public class Tag : BaseEntity
    {
        private Tag() { }

        public string Name { get; private set; } = string.Empty;
        public ICollection<ProductOfferTag> ProductOfferTags { get; set; } = new List<ProductOfferTag>();
        public ICollection<BlogTag> BlogTags { get; set; } = new List<BlogTag>();
        public ICollection<UserTag> UserTags { get; set; } = new List<UserTag>();

        public static Tag Create(string name, int currentUserId)
        {
            if (string.IsNullOrWhiteSpace(name))
                throw new ArgumentException("Tag name cannot be empty.", nameof(name));

            var tag = new Tag
            {
                Name = name
            };

            tag.MarkCreated(currentUserId);
            return tag;
        }

        public void Update(string name, int currentUserId)
        {
            if (!string.IsNullOrWhiteSpace(name))
                Name = name;

            MarkUpdated(currentUserId);
        }
    }
}
