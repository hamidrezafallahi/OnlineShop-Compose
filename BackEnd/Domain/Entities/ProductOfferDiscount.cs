
using OnlineShop.Domain.Entities;


namespace Domain.Entities;

public class ProductOfferDiscount : BaseEntity
{
    public int ProductOfferId { get; private set; }
    public int DiscountId { get;  set; }
    public virtual ProductOffers ProductOffer { get; private set; }
    public virtual Discount Discount { get; private set; }




    public static ProductOfferDiscount Create(int productOfferId , int discountId, int currentUserId)

    {
        var ProductOfferDiscount = new ProductOfferDiscount
        {
            ProductOfferId = productOfferId,
            DiscountId = discountId
        };
        ProductOfferDiscount.MarkCreated(currentUserId);
        return ProductOfferDiscount;

    }
    public void Update(int productOfferId, int discountId, int currentUserId)
    {
        ProductOfferId = productOfferId;
        DiscountId = discountId;
        MarkUpdated(currentUserId);
    }
 
}
