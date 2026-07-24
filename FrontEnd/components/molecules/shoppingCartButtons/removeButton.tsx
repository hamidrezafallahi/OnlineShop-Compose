import React from 'react';

import { useDispatch } from 'react-redux';

import {
  SpinnerIcon,
  Trash2Icon,
} from '@components/atoms/iconComponents';
import { useGetConditionallyMutation } from '@services/base';
import { removeFromCart } from '@slice/shoppingCartSlice';
import { getCookie } from '@utils/core';

import { ShoppingCartButtonProps } from './type';

function RemoveButton({ ...props }: ShoppingCartButtonProps ) {
  const { id,productOfferId,cartItemId, className, content } = props;

  const isAuthenticated = Boolean(getCookie("candyAccess"));
  const [itemMutate, { isLoading }] = useGetConditionallyMutation();

  const dispatch = useDispatch();
  const removeHandler = async (id: number) => {
    if (isAuthenticated) {
      const syncCartResponse = await itemMutate({
        url: `/api/CartItems/removeProductFromCart/${cartItemId}`,
        method: "DELETE",
      }).unwrap();
      if (syncCartResponse.isSuccess) {
        dispatch(removeFromCart({ id ,productOfferId}));
      }
    } else {
      dispatch(removeFromCart({ id ,productOfferId}));
    }
  };
  return (
    <button
      onClick={() => {
        removeHandler(id);
      }}
      className={className}
    >
      {isLoading ? (
        <SpinnerIcon />
      ) : (
        content ?? <Trash2Icon config={{ className: "stroke-rose-800" }} />
      )}
    </button>
  );
}

export default RemoveButton;
