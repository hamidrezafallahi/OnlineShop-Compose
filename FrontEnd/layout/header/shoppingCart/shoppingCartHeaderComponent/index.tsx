import React, {
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';

import {
  useLocale,
  useTranslations,
} from 'next-intl';
import Link from 'next/link';
import {
  shallowEqual,
  useDispatch,
} from 'react-redux';

import { Button } from '@components/atoms/defaultElements/customButton';
import {
  CreditCardIcon,
  RialIcon,
} from '@components/atoms/iconComponents';
import { IShippingMethod } from '@models/shippingMethod';
import { useGetData } from '@services/base';
import { setShippingMethod } from '@slice/shoppingCartSlice';
import { useAppSelector } from '@store/index';

import ItemCart from './itemCart';

interface IProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
 
}
function ShoppingCartHeaderComponent({ ...props }: IProps) {
  const { setIsOpen } = props;
  const locale = useLocale()
  const t = useTranslations();
  const dispatch = useDispatch();

  const { ShoppingCart } = useAppSelector(
    (state) => ({
      ShoppingCart: state.withPersist.ShoppingCart,
    }),
    shallowEqual
  );
  const { data, isSuccess } = useGetData<any, IShippingMethod[]>({
    url: "api/ShippingMethods",
    skip: ShoppingCart.products.length == 0,
  });
  useEffect(() => {
    if (data?.isSuccess) {
      const method =data.data.records.find((m: IShippingMethod) => m.isDefault) ?? data.data.records[0];
      dispatch(setShippingMethod(method));
    }
  }, [data]);
  const kol = ShoppingCart?.finalTotal + ShoppingCart?.shippingMethod?.price!;
  
  return (
    <div
      className="top-full z-50 absolute mt-0 end-0"
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="bg-[#1a1a1a] bg-opacity-90 shadow-2xl p-4 rounded-2xl w-[300px] text-white">
        <div className="flex justify-between items-center mb-1">
          <h2 className="font-semibold text-xl">
            {t("shoppingCart.header.yourCart")}
          </h2>
          <span className="bg-white/10 px-2 py-0.5 rounded-full text-xs">
            {ShoppingCart?.products.length} {t("shoppingCart.header.items")}
          </span>
        </div>

        <p className="mb-3 text-gray-400 text-xs">
          {t("shoppingCart.header.reviewBeforeCheckout")}
        </p>

        <div
          className="hidden-show-scrollbar space-y-3 mb-4 max-h-[calc(100dvh-400px)] overflow-y-auto"
          onScroll={(e) => {
            e.stopPropagation();
          }}
        >
          {ShoppingCart?.products.map((item, index) => (
            <ItemCart key={index} item={item} />
          ))}
        </div>

        <div className="space-y-2 mb-4 pt-3 border-white/10 border-t">
          <div className="flex justify-between text-xs">
            <span className="text-gray-400">
              {t("shoppingCart.header.totalDiscount")}
            </span>
            <span className="flex gap-2 font-medium">
              {ShoppingCart?.totalDiscount.toFixed()}{" "}
              <RialIcon config={{ size: 20 }} />
            </span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-400">
              {t("shoppingCart.header.shipping")}
            </span>
            {ShoppingCart.products.length !== 0 && (
              <div className="flex gap-2">
                <span className="font-medium">
                  {" "}
                  {ShoppingCart?.shippingMethod?.price || 0}
                </span>
                <RialIcon config={{ size: 20 }} />
              </div>
            )}
          </div>
          <div className="flex justify-between pt-2 border-white/10 border-t font-semibold text-base">
            <span>{t("shoppingCart.header.total")}</span>
            <span className="flex gap-2">
              {ShoppingCart?.products?.length > 0 ? kol : 0}
              <RialIcon />
            </span>
          </div>
        </div>

        <div className="flex justify-center items-center gap-1 mb-3 text-[10px] text-gray-400 text-center">
          <span className="flex justify-center items-center border border-gray-400 rounded-full w-3 h-3 text-[8px]">
            ✓
          </span>
          {t("shoppingCart.header.freeShippingOver")}
        </div>

        <div className="space-y-1.5">
          <Button className="bg-white hover:bg-gray-200 w-full h-9 font-medium text-black text-sm">
            <CreditCardIcon />
            {t("shoppingCart.header.checkout")}
          </Button>
          <Link
            // variant="ghost"
            className="hover:bg-white/10 w-full h-8 text-white text-xs"
            href={`/${locale}/shoppingCart`}
          >
            {t("shoppingCart.header.viewCart")} →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCartHeaderComponent;
