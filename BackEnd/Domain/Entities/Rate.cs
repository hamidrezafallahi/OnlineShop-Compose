using Domain.Enums;
using Domain.ValueObjects;

namespace OnlineShop.Domain.Entities
{
    public class Rate : BaseEntity
    {
        private Rate() { }

        public int UserId { get; private set; }
        public User User { get; private set; }

        public int TargetId { get; private set; }
        public EnumTargetType TargetType { get; private set; }

        public RateValue Value { get; private set; } = default!;

        public static Rate Create(
            int userId,
            int targetId,
            EnumTargetType targetType,
            int value,
            int currentUserId
        )
        {
            var rate = new Rate
            {
                UserId = userId,
                TargetId = targetId,
                TargetType = targetType,
                Value = RateValue.Create(value)
            };

            rate.MarkCreated(currentUserId);
            return rate;
        }

        public void UpdateRate(int value, int currentUserId)
        {
            Value = RateValue.Create(value);
            MarkUpdated(currentUserId);
        }
    }
}
