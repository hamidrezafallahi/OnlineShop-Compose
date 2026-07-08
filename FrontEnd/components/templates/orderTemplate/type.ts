import {
  Dispatch,
  SetStateAction,
} from 'react';

import { OrderStatus } from '@models/order';

export interface IProps {
    locale: string;
}

export interface IOrder {
    id: number
    userId: number
    orderDate: string
    status: OrderStatus
    totalPrice: number
    discountPrice: number
    
shippingMethod:{cost:number}
    shippingAddress: {
        id: number
        city: string
        state: string
        postalCode: number
        fullAddress: string
    },
    items: IOrderItem[]


}
interface IOrderItem {
    productId: number
    product: {
        name: string
        description: string
        image: string
        price: number
    },
    quantity: number
    unitPrice: number
}


export interface OrderListProps  {
      selectedOrderId: number | null;

    setSelectedOrderId: Dispatch<SetStateAction<number|null>>
}