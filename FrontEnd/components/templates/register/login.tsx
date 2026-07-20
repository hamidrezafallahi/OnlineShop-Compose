"use client";

import React, { useState } from 'react';

import { jwtDecode } from 'jwt-decode';
import { useTranslations } from 'next-intl';
import {
  useRouter,
  useSearchParams,
} from 'next/navigation';
import {
  shallowEqual,
  useDispatch,
} from 'react-redux';

import { Button } from '@components/atoms/defaultElements/customButton';
import { Checkbox } from '@components/atoms/defaultElements/customCheckbox';
import { Input } from '@components/atoms/defaultElements/customInput';
import { Label } from '@components/atoms/defaultElements/label';
import { cn } from '@lib/utils';
import { SynchronousResponse } from '@models/product';
import { useGetConditionallyMutation } from '@services/base';
import { IBaseQueryResponse } from '@services/base/type';
import { synchronousCart } from '@slice/shoppingCartSlice';
import { useAppSelector } from '@store/index';
import {
  createCookie,
  showErrorToast,
} from '@utils/core';

import {
  ILogin,
  ILoginResponse,
  IProps,
  TokenPayload,
} from './type';

// const baseUrl = process.env.NEXT_PUBLIC_API_URL;
;

export function LoginForm({
  className,
  setIsLogin,
  ...props
}: IProps) {
  const [login, setLogin] = useState<ILogin>({
    EmailOrPhone: "",
    Password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const t = useTranslations();

  const { ShoppingCart, locale } = useAppSelector(
    (state) => ({
      ShoppingCart: state.withPersist.ShoppingCart,
      locale: state.withPersist.config.locale,
    }),
    shallowEqual,
  );

  const route = useRouter();

  const [syncCart] = useGetConditionallyMutation();

  const dispatch = useDispatch();

  const searchParams = useSearchParams();

  const redirectUrl =
    searchParams.get("redirect") || "/";

  const handleLogin = async () => {
    try {
      setIsLoading(true);
          const res = await fetch(`/api/Identity/login`, {
      method: 'POST',
      headers: {
          "Content-Type": "application/json",
        },
      credentials: "include",
      body:  JSON.stringify(login),  // browser خودش Content-Type: multipart/form-data set می‌کنه
    });
  

      const data: IBaseQueryResponse<ILoginResponse> =
        await res.json();

      if (!data.isSuccess) {
        showErrorToast(data.error);
        return;
      }
      createCookie("candyAccess",data.data.accessToken)
      const decoded: TokenPayload = jwtDecode(
        data.data.accessToken,
      );

      const syncCartResponse: IBaseQueryResponse<SynchronousResponse> =
        await syncCart({
          url:`/api/Carts/sync`,
          body: {
            clientItems: ShoppingCart?.products?.length
              ? ShoppingCart.products.map((i) => ({
                  productId: i.id,
                  productOfferId: i.productOfferId,
                  quantity: i.quantity,
                }))
              : undefined,
          },
        }).unwrap();

      if (
        syncCartResponse.isSuccess &&
        syncCartResponse.data.items.length > 0
      ) {
        dispatch(
          synchronousCart(syncCartResponse.data),
        );
      }

      if (decoded.role === "Customer") {
        route.push(
          decodeURIComponent(redirectUrl),
        );
      } else {
        route.replace(`/${locale}/admin`);
      }
    } catch (error) {
      console.error("Login error:", error);

      showErrorToast(
        typeof error === "string"
          ? error
          : "Login failed",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;

    setLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div
      className={cn(
        "bg-white dark:bg-gray-800 shadow-sm p-4 sm:p-6 md:p-8 border border-gray-200 dark:border-gray-700 rounded-lg w-full max-w-sm",
        className,
      )}
      {...props}
    >
      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <h5 className="font-medium text-gray-900 dark:text-white text-xl">
          {t("register.enterEmail")}
        </h5>

        <div>
          <Label
            htmlFor="email"
            className="block mb-2 font-medium text-gray-900 dark:text-white text-sm"
          >
            {t("register.email")}
          </Label>

          <Input
            id="email"
            name="EmailOrPhone"
            placeholder={t(
              "register.emailPlaceHolder",
            )}
            onChange={handleChange}
            required
            className="block bg-gray-50 dark:bg-gray-600 p-2.5 border border-gray-300 focus:border-primary dark:border-gray-500 rounded-lg focus:ring-primary w-full text-gray-900 dark:text-white text-sm dark:placeholder-gray-400"
          />
        </div>

        <div>
          <Label
            htmlFor="password"
            className="block mb-2 font-medium text-gray-900 dark:text-white text-sm"
          >
            {t("register.password")}
          </Label>

          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            name="Password"
            onChange={handleChange}
            required
            className="block bg-gray-50 dark:bg-gray-600 p-2.5 border border-gray-300 focus:border-primary dark:border-gray-500 rounded-lg focus:ring-primary w-full text-gray-900 dark:text-white text-sm dark:placeholder-gray-400"
          />
        </div>

        <div className="flex flex-col justify-between items-start gap-4">
          <div className="flex items-center">
            <Checkbox
              id="remember"
              className="text-primary"
            />

            <Label
              htmlFor="remember"
              className="ms-2 font-medium text-gray-900 dark:text-gray-300 text-sm"
            >
              {t("register.rememberMe")}
            </Label>
          </div>

          <a
            href="#"
            className="text-primary dark:text-primary text-sm hover:underline"
          >
            {t("register.forgotPassword")}
          </a>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/80 px-5 py-2.5 rounded-lg focus:outline-none focus:ring-4 focus:ring-primary/30 dark:focus:ring-primary/50 w-full font-medium text-white text-sm text-center"
        >
          {isLoading
            ? t("common.loading")
            : t("register.enter")}
        </Button>

        <div className="font-medium text-gray-500 dark:text-gray-300 text-sm text-center">
          {t("register.dotHaveAnyAccount")}{" "}
          <button
            type="button"
            onClick={() => setIsLogin(false)}
            className="text-primary dark:text-primary hover:underline"
          >
            {t("register.signUp")}
          </button>
        </div>
      </form>
    </div>
  );
}
