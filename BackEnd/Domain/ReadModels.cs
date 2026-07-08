using OnlineShop.Domain.Entities;
using OnlineShop.Domain.Enums;
using System.Xml.Linq;

public class DetailCartReadModel
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public List<DetailCartItemReadModel> Items { get; set; } = new();
}
public class CartReadModel
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public List<CartItemReadModel> Items { get; set; } = new();
    public decimal TotalDiscount { get; set; }
    public decimal TotalPrice { get; set; }
    public decimal FinalTotal => TotalPrice - TotalDiscount;
}

public class CartItemReadModel
{
    public int ProductOfferId { get; set; }
    public int CartItemId { get; set; }

    public int ProductId { get; set; }
    public string Name { get; set; } = "";
    public string Description { get; set; } = "";

    public decimal BasePrice { get; set; }
    public decimal DiscountAmount { get; set; }
    public decimal FinalPrice { get; set; }

    public int Quantity { get; set; }

    public string? MainImage { get; set; }
}



public class DetailCartItemReadModel
{
    public int ProductId { get; set; }
    public int ProductOfferId { get; set; }

    public string Name { get; set; } = "";
    public decimal BasePrice { get; set; }
    public int Quantity { get; set; }
    public decimal DiscountAmount { get; set; }
    public decimal FinalPrice { get; set; }
    public string MainImage { get; set; } = "";
    public string Description { get; set; } = "";
    public List<DiscountReadModel> Discounts { get; set; } = new();
}

public class DiscountReadModel
{
    public bool IsPercent { get; set; }
    public int Priority { get; set; }
    public decimal AmountAfterCalc { get; set; }
    public decimal Amount { get; set; }
}
public class UserModel
{
    public string FullName { get;  set; } = string.Empty;
    public string Email { get;  set; } = string.Empty;
    public string PhoneNumber { get;  set; } = string.Empty;
    public string Password { get;  set; } = string.Empty;
    public string Image { get; set; } = string.Empty;
    public string UserDescription { get; set; } = string.Empty;

    public int RoleId { get;  set; }
    public Role Role { get;  set; }

    public ICollection<Order> Orders = new HashSet<Order>();
    public ICollection<Blog> Blogs = new HashSet<Blog>();
    public ICollection<UserAddress> Addresses = new HashSet<UserAddress>();
    public Cart? Cart { get;  set; }
}


public class OrderReadModel
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public DateTime OrderDate { get; set; }
    public OrderStatus Status { get; set; }
    public decimal TotalPrice { get; set; }
    public decimal? DiscountPrice { get; set; }
    public string? DiscountCode { get; set; }
    public PaymentMethodReadModel PaymentMethod { get; set; }
    public ShippingMethodReadModel ShippingMethod { get; set; }
    public UserAddressReadModel ShippingAddress { get; set; }

    public IEnumerable<OrderItemReadModel> Items { get; set; } = new List<OrderItemReadModel>();
}
public class UserAddressReadModel
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string State { get; set; } = string.Empty;
    public string PostalCode { get; set; } = string.Empty;
    public string FullAddress { get; set; } = string.Empty;
}

public class PaymentMethodReadModel
{
    public string Title { get; set; } = string.Empty;
}

public class ShippingMethodReadModel
{
    public string Title { get; set; } = string.Empty;
    public decimal Cost { get; set; }

}

public class OrderItemReadModel
{
    public int Id { get; set; }
    public int OrderId { get; set; }

    public int ProductOfferId { get; set; }
    public ProductReadModel Product { get; set; }
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
}
public class ProductReadModel
{
    public string Name { get; set; }
    public string Image { get; set; }

    public string Description { get; set; }
    public decimal Price { get; set; }

}

public class MenuReadModel
{
    public string EntityName { get; set; }
    public string PersianDisplayName { get; set; }
    public string EnglishDisplayName { get; set; }

    public string EndPoint { get; set; }

    public string EntityIconBase64 { get; set; }

}
public class FormReadModel
{
    public string EntityName { get; set; }
    public string PersianDisplayName { get; set; }
    public string EnglishDisplayName { get; set; }

    public string EndPoint { get; set; }

    public string EntityIconBase64 { get; set; }
    public string FormFieldsJson { get; set; }


}

public class AverageRateReadModel
{
    public int TargetId { get; set; }
    public double Average { get; set; }
    public int Count { get; set; }
}
