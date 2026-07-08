

namespace OnlineShop.Domain.Entities
{
    public class UserTag : BaseEntity
    {
        private UserTag() { }

        public int UserId { get; private set; }
        public int TagId { get; private set; }

        public User User { get; private set; }
        public Tag Tag { get; private set; }

        public static UserTag Create(int userId, int tagId, int currentUserId)
        {
            var userTag = new UserTag
            {
                UserId = userId,
                TagId = tagId
            };

            userTag.MarkCreated(currentUserId);
            return userTag;
        }

        public void Update(int userId, int tagId, int currentUserId)
        {
            UserId = userId;
            TagId = tagId;
            MarkUpdated(currentUserId);
        }
    }
}
