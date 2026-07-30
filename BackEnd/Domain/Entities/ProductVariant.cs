using OnlineShop.Domain.Enums;

namespace OnlineShop.Domain.Entities
{
    /// <summary>
    /// Catalog SKU identity for perfume (bottle size + concentration).
    /// Price and inventory stay on ProductOffers per supplier.
    /// </summary>
    public class ProductVariant : BaseEntity
    {
        private ProductVariant() { }

        public int ProductId { get; private set; }
        public Product Product { get; private set; } = null!;

        /// <summary>Bottle volume in milliliters. Use 0 for unspecified legacy rows.</summary>
        public int SizeMl { get; private set; }

        public PerfumeConcentration Concentration { get; private set; }

        public ICollection<ProductOffers> Offers { get; private set; } = new List<ProductOffers>();

        public static ProductVariant Create(
            int productId,
            int sizeMl,
            PerfumeConcentration concentration,
            int currentUserId)
        {
            if (sizeMl < 0)
                throw new ArgumentOutOfRangeException(nameof(sizeMl), "SizeMl cannot be negative.");

            var variant = new ProductVariant
            {
                ProductId = productId,
                SizeMl = sizeMl,
                Concentration = concentration
            };
            variant.MarkCreated(currentUserId);
            return variant;
        }

        public void Update(int? sizeMl, PerfumeConcentration? concentration, int currentUserId)
        {
            if (sizeMl.HasValue)
            {
                if (sizeMl.Value < 0)
                    throw new ArgumentOutOfRangeException(nameof(sizeMl));
                SizeMl = sizeMl.Value;
            }

            if (concentration.HasValue)
                Concentration = concentration.Value;

            MarkUpdated(currentUserId);
        }

        public string DisplayLabel =>
            SizeMl > 0
                ? $"{SizeMl}ml {Concentration}"
                : Concentration.ToString();
    }
}
