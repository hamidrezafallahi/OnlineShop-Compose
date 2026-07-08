

using static System.Net.Mime.MediaTypeNames;

namespace OnlineShop.Domain.Entities
{
    public class User : BaseEntity
    {
        private User() { } 

        public string FullName { get; private set; } = string.Empty;
        public string Email { get; private set; } = string.Empty;
        public string PhoneNumber { get; private set; } = string.Empty;
        public string Password { get; private set; } = string.Empty;
        public int RoleId { get; private set; }   
        public Role Role { get; private set; }
        public string Image { get; private set; }
        public string? UserDescription { get; private set; }


        public ICollection<Order> Orders = new HashSet<Order>();
        public ICollection<RefreshToken> RefreshTokens = new HashSet<RefreshToken>();
        public ICollection<Blog> Blogs = new HashSet<Blog>();
        public ICollection<UserAddress> Addresses = new HashSet<UserAddress>();
        public ICollection<UserTag> UserTags { get; private set; } = new List<UserTag>();

        public Cart? Cart { get; private set; }

        // ===== Factory Method =====
        public static User Create(
            string fullName,
            string email,
            string phoneNumber,
            string userDescription,
            int currentUserId)
        {
            if (string.IsNullOrWhiteSpace(fullName))
                throw new ArgumentException("FullName cannot be empty.", nameof(fullName));

            if (string.IsNullOrWhiteSpace(email))
                throw new ArgumentException("Email cannot be empty.", nameof(email));

            if (string.IsNullOrWhiteSpace(phoneNumber))
                throw new ArgumentException("PhoneNumber cannot be empty.", nameof(phoneNumber));

            var user = new User
            {
                FullName = fullName,
                Email = email,
                PhoneNumber = phoneNumber,
                UserDescription= userDescription,
                RoleId =6,
                Role=new Role { Id=6,RoleName= "Customer" },
            };

            user.MarkCreated(currentUserId);
            return user;
        }


        public static User Create(
          string fullName,
          string email,
          string phoneNumber,
                      string userDescription

          )
        {
            if (string.IsNullOrWhiteSpace(fullName))
                throw new ArgumentException("FullName cannot be empty.", nameof(fullName));

            if (string.IsNullOrWhiteSpace(email))
                throw new ArgumentException("Email cannot be empty.", nameof(email));

            if (string.IsNullOrWhiteSpace(phoneNumber))
                throw new ArgumentException("PhoneNumber cannot be empty.", nameof(phoneNumber));

          
            var user = new User
            {
                FullName = fullName,
                Email = email,
                PhoneNumber = phoneNumber,
                Image="",
                UserDescription = userDescription,
                RoleId = 6
            };

            return user;
        }



        // ===== Behavior Methods =====
        public void UpdateProfile(string fullName, string phoneNumber, string userDescription,int currentUserId)
        {
            if (!string.IsNullOrWhiteSpace(fullName))
                FullName = fullName;

            if (!string.IsNullOrWhiteSpace(phoneNumber))
                PhoneNumber = phoneNumber;
            if (!string.IsNullOrWhiteSpace(userDescription))
                UserDescription = userDescription;

            MarkUpdated(currentUserId);
        }

        public void ChangePassword(string newPassword, int currentUserId)
        {
            if (string.IsNullOrWhiteSpace(newPassword))
                throw new ArgumentException("PasswordHash cannot be empty.", nameof(newPassword));
            Password = newPassword;
            MarkUpdated(currentUserId);
        }

        public void SetRole(Role role, int currentUserId)
        {
            RoleId = role.Id;
            Role = role;
            MarkUpdated(currentUserId);
        }
        public void SetImage(string image, int currentUserId)
        {
            if (image == null)
                throw new ArgumentNullException(nameof(image));

            Image = image;
            MarkUpdated(currentUserId);
        }

        public void AddAddress(UserAddress address, int currentUserId)
        {
            if (address == null)
                throw new ArgumentNullException(nameof(address));

            Addresses.Add(address);
            MarkUpdated(currentUserId);
        }

        public void RemoveAddress(UserAddress address, int currentUserId)
        {
            if (address == null)
                throw new ArgumentNullException(nameof(address));

            Addresses.Remove(address);
            MarkUpdated(currentUserId);
        }

        public void AddBlog(Blog blog, int currentUserId)
        {
            if (blog == null)
                throw new ArgumentNullException(nameof(blog));

            Blogs.Add(blog);
            MarkUpdated(currentUserId);
        }

        public void RemoveBlog(Blog blog, int currentUserId)
        {
            if (blog == null)
                throw new ArgumentNullException(nameof(blog));

            Blogs.Remove(blog);
            MarkUpdated(currentUserId);
        }

        public void SetCart(Cart cart, int currentUserId)
        {
            Cart = cart ?? throw new ArgumentNullException(nameof(cart));
            MarkUpdated(currentUserId);
        }
    }
}
