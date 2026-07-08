"use client";
import React, {
  Suspense,
  useState,
} from 'react';

import { useTranslations } from 'next-intl';
import { shallowEqual } from 'react-redux';

import { Button } from '@components/atoms/defaultElements/customButton';
import {
  ShoppingCartIcon,
  SpinnerIcon,
} from '@components/atoms/iconComponents';
import { useAppSelector } from '@store/index';

const ShoppingCartHeaderComponent = React.lazy(
  () => import("./shoppingCartHeaderComponent")
);

function ShoppingCart() {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);

  const { ShoppingCart } = useAppSelector(
    (state) => ({
      ShoppingCart: state.withPersist.ShoppingCart,
    }),
    shallowEqual
  );

  return (
    <>
      <div className="relative">
        <Button
          aria-label={t("header.register")}
          className="relative flex justify-center items-center bg-white/30 hover:bg-white/40 shadow-black/20 shadow-lg hover:shadow-black/30 hover:shadow-xl backdrop-blur-md border border-white/20 rounded-md xs:rounded-full w-10 h-10 transition-all duration-300"
          onMouseEnter={() => setIsOpen(true)}
          onClick={() => setIsOpen(!isOpen)}
        >
          <ShoppingCartIcon config={{ size: 20 }} />
          {ShoppingCart?.products.length > 0 && (
            <span className="-z-10 absolute bg-rose-600 rounded-full w-4 text-xs -translate-y-2 translate-x-2">
              {ShoppingCart?.products.length}
            </span>
          )}
        </Button>

        {isOpen && (
          <Suspense
            fallback={
              <div className="top-2 absolute start-2">
                <SpinnerIcon />
              </div>
            }
          >
            <ShoppingCartHeaderComponent
              setIsOpen={setIsOpen}
            />
          </Suspense>
        )}
      </div>
    </>
  );
}

export default ShoppingCart;
