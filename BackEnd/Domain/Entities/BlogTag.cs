using OnlineShop.Domain.Entities;



namespace OnlineShop.Domain.Entities
{
    public class BlogTag : BaseEntity
    {
        private BlogTag() { }

        public int BlogId { get; private set; }
        public int TagId { get; private set; }

        public Blog Blog { get; private set; }
        public Tag Tag { get; private set; }

        public static BlogTag Create(int blogId, int tagId, int currentUserId)
        {
            var blogTag = new BlogTag
            {
                BlogId = blogId,
                TagId = tagId
            };

            blogTag.MarkCreated(currentUserId);
            return blogTag;
        }

        public void Update(int blogId, int tagId, int currentUserId)
        {
            BlogId = blogId;
            TagId = tagId;
            MarkUpdated(currentUserId);
        }

    }
}
