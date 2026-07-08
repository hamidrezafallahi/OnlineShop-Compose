

namespace OnlineShop.Domain.Entities
{
    public class ProductOfferTag : BaseEntity
    {
        private ProductOfferTag() { }

        public int ProductOfferId { get; private set; }
        public int TagId { get; private set; }

        public ProductOffers ProductOffer { get; private set; }
        public Tag Tag { get; private set; }

        public static ProductOfferTag Create(int productOfferId, int tagId, int currentUserId)
        {
            var productOfferTag = new ProductOfferTag
            {
                ProductOfferId = productOfferId,
                TagId = tagId
            };

            productOfferTag.MarkCreated(currentUserId);
            return productOfferTag;
        }

        public void Update(int productOfferId, int tagId, int currentUserId)
        {
            ProductOfferId = productOfferId;
            TagId = tagId;
            MarkUpdated(currentUserId);
        }
 

    }
}
