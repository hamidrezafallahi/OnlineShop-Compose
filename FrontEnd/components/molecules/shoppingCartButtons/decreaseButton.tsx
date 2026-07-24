import React from 'react';

import { useDispatch } from 'react-redux';

import { SpinnerIcon } from '@components/atoms/iconComponents';
import { useGetConditionallyMutation } from '@services/base';
import {
  decreaseFromCart,
  removeFromCart,
  synchronousCart,
} from '@slice/shoppingCartSlice';
import { getCookie } from '@utils/core';

import { ShoppingCartButtonProps } from './type';

function DecreaseButton({ ...props }: ShoppingCartButtonProps) {
  const { id, productOfferId, className, content } = props;
  const isAuthenticated = Boolean(getCookie("candyAccess"));
  const [itemMutate, { isLoading }] = useGetConditionallyMutation();

  const dispatch = useDispatch();
  const decreaseHandler = async () => {
    if (isAuthenticated) {
      const syncCartResponse = await itemMutate({
        url: `/api/CartItems/decrease`,
        body: { ProductId: id, ProductOfferId: productOfferId },
      }).unwrap();
      if (syncCartResponse.isSuccess) {
        if (syncCartResponse.data?.items?.length > 0) {
          dispatch(synchronousCart(syncCartResponse.data));
        } else {
          dispatch(removeFromCart({ id, productOfferId }));
        }
      }
    } else {
      console.log("no token decrease");
      dispatch(decreaseFromCart({ id, productOfferId }));
    }
  };
  return (
    <button
      onClick={() => {
        decreaseHandler();
      }}
      className={className}
    >
      {isLoading ? <SpinnerIcon /> : (content ?? <>−</>)}
    </button>
  );
}

export default DecreaseButton;
