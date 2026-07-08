
namespace OnlineShop.Domain.Entities
{
    public class UserAddress : BaseEntity
    {
        private UserAddress() { } 

        public int UserId { get; private set; }
        public User User { get; private set; } = default!;
        public string Name { get; private set; } = string.Empty;
        public string City { get; private set; } = string.Empty;
        public string State { get; private set; } = string.Empty;
        public string PostalCode { get; private set; } = string.Empty;
        public string PhoneNumber { get; private set; } = string.Empty;

        public string FullAddress { get; private set; } = string.Empty;
        public bool IsDefault { get; private set; } = false;
        // ===== Factory Method =====
        public static UserAddress Create(
            int userId,
            string name,
            string phoneNumber,
            string city,
            string state,
            string postalCode,
            string fullAddress,
            int currentUserId)
        {
            if (string.IsNullOrWhiteSpace(city))
                throw new ArgumentException("Name cannot be empty.", nameof(name));
            if (string.IsNullOrWhiteSpace(city))
                throw new ArgumentException("PhoneNumber cannot be empty.", nameof(phoneNumber));

            if (string.IsNullOrWhiteSpace(city))
                throw new ArgumentException("City cannot be empty.", nameof(city));

            if (string.IsNullOrWhiteSpace(state))
                throw new ArgumentException("State cannot be empty.", nameof(state));

            if (string.IsNullOrWhiteSpace(postalCode))
                throw new ArgumentException("PostalCode cannot be empty.", nameof(postalCode));

            if (string.IsNullOrWhiteSpace(fullAddress))
                throw new ArgumentException("FullAddress cannot be empty.", nameof(fullAddress));

            var address = new UserAddress
            {
                Name=name,
                PhoneNumber=phoneNumber,
                UserId = userId,
                City = city,
                State = state,
                PostalCode = postalCode,
                FullAddress = fullAddress,
            };

            address.MarkCreated(currentUserId);
            return address;
        }

        // ===== Behavior Methods =====
        public void Update(
        int currentUserId,
            string? name,
            string? phoneNumber,
            string? city,
            string? state,
            string? postalCode,
            string? fullAddress)
        {
            if (!string.IsNullOrWhiteSpace(name))
                Name = name;
            if (!string.IsNullOrWhiteSpace(phoneNumber))
                PhoneNumber = phoneNumber;

            if (!string.IsNullOrWhiteSpace(city))
                City = city;

            if (!string.IsNullOrWhiteSpace(state))
                State = state;

            if (!string.IsNullOrWhiteSpace(postalCode))
                PostalCode = postalCode;

            if (!string.IsNullOrWhiteSpace(fullAddress))
                FullAddress = fullAddress;

           

            MarkUpdated(currentUserId);
        }


        public void SetDefault(bool isDefault, int currentUserId)
        {
            IsDefault = isDefault;
            MarkUpdated(currentUserId);
        }
    }
}
