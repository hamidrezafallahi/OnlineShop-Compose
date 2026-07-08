namespace Application.Dtos
{
    public class CreateUserDto
    {
        public string FullName { get; set; } = default!;
        public string Email { get; set; } = default!;
        public string PhoneNumber { get; set; } = default!;
        public string Password { get; set; } = default!;
    }
    public class UpdateUserDto
    {
        public string? FullName { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Password { get; set; } 
    }
    public class UserDto
    {
        public int Id { get; set; }
        public string FullName { get; set; } = default!;
        public string Email { get; set; } = default!;
        public string PhoneNumber { get; set; } = default!;
        public string UserImage { get; set; } = default!;
        public string UserDescription { get;  set; }
        public double AverageRate { get; set; }
        public bool IsActive { get; set; }

        public int RateCount { get; set; }

        public List<UserAddressDto>? Addresses { get; set; }
    }
    public class UserDtoForPage
    {
        public int Id { get; set; }
        public string FullName { get; set; } = default!;
        public string Email { get; set; } = default!;
        public string PhoneNumber { get; set; } = default!;
        public string UserImage { get; set; } = default!;

        public UserAddressDto? MainAddress { get; set; }

        public List<CommentDto> Comments { get; set; } = [];
        public List<TagDto> Tags { get; set; } = new();
        public double AverageRate { get; set; }
        public int RateCount { get; set; }
        public List<ProductDto> Products { get; set; } = [];
        public List<BrandDto> Brands { get; set; } = [];
        public List<CategoryDto> Categories { get; set; } = [];
        public List<BlogDto> Blogs { get; set; } = [];

    }
    public class UserAddressDto
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public string Name { get;  set; }
        public string? UserName { get; set; }

        public string PhoneNumber { get;  set; }
        public string City { get; set; } 
        public string State { get; set; }
        public string PostalCode { get; set; } 
        public string FullAddress { get; set; }
        public bool IsDefault { get; set; }
        public bool IsActive { get; set; }

    }
    
    
    public class UserRoleDto
    {
        public int Id { get; set; }
        public bool IsActive { get; set; }
        public string Name { get; set; }
    }

}
