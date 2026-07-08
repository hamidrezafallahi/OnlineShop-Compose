import React from 'react';

import { RialIcon } from '@components/atoms/iconComponents';
import DecreaseButton
  from '@components/molecules/shoppingCartButtons/decreaseButton';
import IncreaseButton
  from '@components/molecules/shoppingCartButtons/increaseButton';
import RemoveButton
  from '@components/molecules/shoppingCartButtons/removeButton';
import { ICartProduct } from '@models/product';

function ItemCart({ ...props }: { item: ICartProduct }) {
  const { item } = props;
  return (
    <div className="flex gap-2">
      <div className="flex-shrink-0 bg-gray-700 rounded-lg w-14 h-14 overflow-hidden">
        <img
          src={item.mainImage}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-2 mb-0.5">
          <h3 className="font-medium text-xs truncate leading-tight">
            {item.name}
          </h3>
          <RemoveButton
            id={item.id}
            cartItemId={item.cartItemId}
            productOfferId={item.productOfferId}
            className="flex-shrink-0 text-gray-400 hover:text-white"
          />
        </div>

        <p className="mb-1.5 text-[10px] text-gray-400">{item.description}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1.5 bg-white/5 px-1.5 py-0.5 rounded-lg">
            <DecreaseButton
              id={item.id}
              productOfferId={item.productOfferId}
              className="flex justify-center items-center w-4 h-4 text-gray-400 hover:text-white text-xs"
            />

            <span className="w-5 text-xs text-center">{item.quantity}</span>
            <IncreaseButton
              id={item.id}
              productOfferId={item.productOfferId}
              className="flex justify-center items-center w-4 h-4 text-gray-400 hover:text-white text-xs"
            />
          </div>

          <div className="text-right">
            <div className="flex gap-2 font-semibold text-sm">
              {item.finalPrice * item.quantity}
              <RialIcon config={{ size: 20 }} />
            </div>
            {item.discountAmount > 0 && (
              <div className="flex gap-2 text-[10px] text-gray-500 line-through">
                {item.price * item.quantity}
                <RialIcon config={{ size: 20 }} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemCart;
