namespace Application.Dtos
{
    public class BrandDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = default!;
        public string logoFile { get; set; } = default!;
        public string Description { get; set; } = default!;
        public bool IsActive { get; set; }

    }
   
}
