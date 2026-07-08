import { ReactNode } from 'react';

export interface ShoppingCartButtonProps{
    id: number;
    productOfferId: number;
    cartItemId?: number;
    className?:string
    content?:ReactNode
}