
using OnlineShop.Domain.Entities;

public class Role : BaseEntity
{
    public int Id { get; set; }
    public string RoleName { get; set; } = string.Empty;

    public ICollection<User> Users { get; set; } = new List<User>();
}


