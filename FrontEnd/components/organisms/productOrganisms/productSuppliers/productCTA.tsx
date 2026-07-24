'use client';

import { useLocale } from 'next-intl';
import { useDispatch } from 'react-redux';

import { useGetConditionallyMutation } from '@services/base';
import { synchronousCart } from '@slice/shoppingCartSlice';
import { getCookie } from '@utils/core';

export default function ProductCTA({ id,productId }: { id: number;productId:number }) {
   const isAuthenticated = Boolean(getCookie("candyAccess"));
  const locale = useLocale()
    const [addToShoppingCart] = useGetConditionallyMutation();
  const dispatch = useDispatch()
 const handleAddToCart = async () => {
    if (isAuthenticated) {
      console.log(id)
      const syncCartResponse = await addToShoppingCart({
        url: "/api/CartItems",
        body: {
          productId,
          productOfferId: id,
          quantity: 1,
        },
      }).unwrap();
      if (syncCartResponse.isSuccess) {
        dispatch(synchronousCart(syncCartResponse.data));
      }
    } else {
      // dispatch(addToCart({ product: product }));
    }
  };
  return (
    <div className="flex gap-3 mt-4">
      <button
      onClick={handleAddToCart}
      className="bg-primary px-6 py-3 rounded-xl text-white">
        افزودن به سبد
      </button>
      {/* <button className="px-6 py-3 border rounded-xl">
        ❤️ علاقه‌مندی
      </button> */}
    </div>
  );
}
