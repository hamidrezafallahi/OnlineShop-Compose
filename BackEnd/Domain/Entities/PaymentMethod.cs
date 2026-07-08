using Domain.Enums;
using System.Collections.Generic;

namespace OnlineShop.Domain.Entities
{
    public class PaymentMethod : BaseEntity
    {
        private PaymentMethod() { }

        // ================= Properties =================
        public string Title { get; private set; } = string.Empty;
        public string Code { get; private set; } = string.Empty;
        public bool IsOnline { get; private set; }
        public string? ConfigJson { get; private set; }
        public bool IsActive { get; private set; } = true;
        public int DisplayOrder { get; private set; }

        // ================= Navigation =================
        public ICollection<Payment> Payments { get; private set; } = new HashSet<Payment>();

        // ================= Factory =================
        public static PaymentMethod Create(
            string title,
            string code,
            bool isOnline,
            string? configJson,
            int displayOrder,
            int userId)
        {
            var method = new PaymentMethod
            {
                Title = title,
                Code = code,
                IsOnline = isOnline,
                ConfigJson = configJson,
                DisplayOrder = displayOrder,
                IsActive = true
            };

            method.MarkCreated(userId);
            return method;
        }

        // ================= Behaviors =================
        public void Update(
            string title,
            bool isOnline,
            string? configJson,
            int displayOrder,
            int userId)
        {
            Title = title;
            IsOnline = isOnline;
            ConfigJson = configJson;
            DisplayOrder = displayOrder;
            MarkUpdated(userId);
        }

        public void Activate(int userId)
        {
            IsActive = true;
            MarkUpdated(userId);
        }

        public void Deactivate(int userId)
        {
            IsActive = false;
            MarkUpdated(userId);
        }
    
    }
}
