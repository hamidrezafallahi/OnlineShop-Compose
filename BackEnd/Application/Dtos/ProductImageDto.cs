using Microsoft.AspNetCore.Http;
public class ProductImageDto
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public IFormFile? ProductImageFile { get; set; }  
    public bool IsMain { get; set; }
}
public class GetProductImageDto
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public string ProductName { get; set; }

    public string ProductImageUrl { get; set; }
    public bool IsMain { get; set; }
    public bool IsActive { get; set; }

}