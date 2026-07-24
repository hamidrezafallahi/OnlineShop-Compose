import React, {
  Suspense,
  useState,
} from 'react';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import {
  shallowEqual,
  useDispatch,
} from 'react-redux';

import { Button } from '@components/atoms/defaultElements/customButton';
import { Modal } from '@components/atoms/defaultElements/customModal';
import {
  ListIcon,
  SpinnerIcon,
} from '@components/atoms/iconComponents';
import { useGetConditionallyMutation } from '@services/base';
import { IBaseQueryResponse } from '@services/base/type';
import { clearShoppingCart } from '@slice/shoppingCartSlice';
import { useAppSelector } from '@store/index';

import { IProps } from '../type';

const FinalizeOrder = React.lazy(
  () => import("@components/molecules/finalizeOrder")
);

function SubmitButton({ ...props }: IProps) {
  const { locale } = props;
  const [itemMutate, { isLoading }] = useGetConditionallyMutation();
  const [modalData, setModalData] = useState<{open:boolean,id:undefined|number}>({open:false,id:undefined});
  const [syncCart] = useGetConditionallyMutation();
  const [payResponse] = useGetConditionallyMutation();
  const dispatch = useDispatch();
  const t = useTranslations();

  const { ShoppingCart } = useAppSelector(
    (state) => ({
      ShoppingCart: state.withPersist.ShoppingCart,
    }),
    shallowEqual
  );
  const route = useRouter();
  const handleSetOrder = async () => {

    if (!!ShoppingCart?.address) {
      const order:IBaseQueryResponse<{orderId:number}> = await itemMutate({
        url: "/api/Orders/CheckoutCart",
        body: {
          shippingAddressId: ShoppingCart.address.id,
          shippingMethodId: ShoppingCart.shippingMethod?.id,
          paymentMethodId: ShoppingCart.paymentMethod?.id,
          shippingCost: ShoppingCart.shippingMethod?.price,
          discountAmount: ShoppingCart.discountCodeAmount,
          discountCode: ShoppingCart.promoCode,
        },
        method: "POST",
      }).unwrap();
      if (order.isSuccess) {
    setModalData({open:true,id:order.data.orderId});
    dispatch(clearShoppingCart())
    //     // const confirm:IBaseQueryResponse<{}> = await payResponse({
    //     //       url:"api/Orders/confirm",
    //     //       body:{orderId: order.data.orderId}
    //     //   }).unwrap()
    //       // console.log(confirm)
    //       // if (confirm.isSuccess) {

    //       // const pay:IBaseQueryResponse<{}> = await payResponse({
    //       //     url:"api/Orders/pay",
    //       //     body:{orderId: order.data.orderId}
    //       // }).unwrap()
    //       // if (pay.isSuccess) {
    //       //   const syncCartResponse: IBaseQueryResponse<SynchronousResponse> =
    //       //     await syncCart({
    //       //       url: `api/Carts/sync`,
    //       //       body: {},
    //       //     }).unwrap();
    //       //   if(syncCartResponse.isSuccess){
    //       //     dispatch(clearShoppingCart());
    //       //     route.push(`/${locale}/payment`);
    //       // }
    //     // }
    //   // }
    }
    }
  };
  return (
    <>
      <Button
        // href={`/${locale}/checkout`}
        className="flex justify-center items-center gap-2 bg-white hover:bg-gray-100 py-3 w-full font-medium text-black"
        onClick={handleSetOrder}
        disabled={
          ShoppingCart?.address?.id == null ||
          ShoppingCart?.products?.length == 0
        }
      >
        {/* <PaymentIcon /> */}
        {isLoading ? (
          <SpinnerIcon />
        ) : (
          <>
            <ListIcon />
            {ShoppingCart?.address?.id == null
              ? t("shoppingCart.chooseAddress")
              : ShoppingCart?.products?.length == 0
              ? t("shoppingCart.emptyCart")
              : t("shoppingCart.placeOrder")}
          </>
        )}
      </Button>
      {modalData.open && (
        <Suspense
          fallback={
            <div className="top-2 absolute start-2">
              <SpinnerIcon />
            </div>
          }
        >
          <Modal
            open={modalData.open}
            children={
              <FinalizeOrder
              orderId={modalData.id!}
                onClose={() => {
                  setModalData({open:false,id:undefined});
                }}
              />
            }
            onClose={() => {
              setModalData({open:false,id:undefined});
            }}
          />
        </Suspense>
      )}
    </>
  );
}

export default SubmitButton;
