 
namespace OnlineShop.Domain.Entities
{
    public abstract class BaseEntity
    {
        public int Id { get; set; }
        public DateTime CreatedAt { get; private set; }
        public DateTime? UpdatedAt { get; private set; }
        public DateTime? DeletedAt { get; private set; }

        public bool IsDeleted { get; private set; } = false;

        public int? CreatedBy { get; private set; }
        public int? UpdatedBy { get; private set; }
        public int? DeletedBy { get; private set; }

        public bool IsActive { get; private set; } = true;

        protected void MarkCreated(int userId)
        {
            CreatedAt = DateTime.UtcNow;
            CreatedBy = userId;
        }

        protected void MarkUpdated(int userId)
        {
            UpdatedAt = DateTime.UtcNow;
            UpdatedBy = userId;
        }

        protected void MarkDeleted(int userId)
        {
            if (IsDeleted)
                throw new InvalidOperationException("Entity already deleted.");

            IsDeleted = true;
            DeletedAt = DateTime.UtcNow;
            DeletedBy = userId;
        }
        public void SetActive(bool isActive, int userId)
        {
                IsActive = isActive;
                UpdatedAt = DateTime.UtcNow;
                UpdatedBy = userId;
        }
        public void Delete(int currentUserId)
        {
            MarkDeleted(currentUserId);
        }
    }
}
