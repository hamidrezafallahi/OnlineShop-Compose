namespace OnlineShop.Domain.ValueObjects
{
    public class ProductDimensions
    {
        public decimal? Width { get; }
        public decimal? Height { get; }
        public decimal? Depth { get; }
        public decimal? Weight { get; }

        private ProductDimensions() { }

        public ProductDimensions(decimal? width, decimal? height, decimal? depth, decimal? weight)
        {
            if (width < 0 || height < 0 || depth < 0)
                throw new ArgumentException("Dimensions must be positive.");

            if (weight < 0)
                throw new ArgumentException("Weight cannot be negative.");

            Width = width;
            Height = height;
            Depth = depth;
            Weight = weight;
        }
    }
}
