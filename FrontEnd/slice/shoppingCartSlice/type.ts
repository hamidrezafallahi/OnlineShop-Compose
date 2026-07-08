import { IAddress } from '@components/templates/shoppingCartTemplate/type';
import { IPaymentMethod } from '@models/paymentMethod';
import { ICartProduct } from '@models/product';
import { IShippingMethod } from '@models/shippingMethod';

export interface IShoppingCart {
  products: ICartProduct[];
  totalPrice: number;
  totalDiscount: number;
  finalTotal: number;
  address:IAddress|null
  shippingMethod:IShippingMethod|undefined
  discountCodeAmount :number
  paymentMethod:IPaymentMethod|undefined
  promoCode:string
}
