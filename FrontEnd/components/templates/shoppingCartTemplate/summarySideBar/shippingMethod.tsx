import React, {
  useEffect,
  useState,
} from 'react';

import { useTranslations } from 'next-intl';
import { useDispatch } from 'react-redux';

import { Button } from '@components/atoms/defaultElements/customButton';
import { RialIcon } from '@components/atoms/iconComponents';
import { IShippingMethod } from '@models/shippingMethod';
import { useGetData } from '@services/base';
import { setShippingMethod } from '@slice/shoppingCartSlice';
import { useAppSelector } from '@store/index';

function ShippingMethod() {
  const t = useTranslations();
  const dispatch = useDispatch();
  const { shippingMethod } = useAppSelector((state) => ({
    shippingMethod: state.withPersist.ShoppingCart.shippingMethod,
  }));
  const [methods, setMethods] = useState<IShippingMethod[]>([]);
  const { data, isSuccess } = useGetData<any>({
    url: "/api/ShippingMethods",
  });
  const handleChangeShippingMethod = (el:IShippingMethod) => {
    if(shippingMethod?.id !== el.id){
      dispatch(setShippingMethod(el));
    }
  };
useEffect(() => {
  if (data?.isSuccess) {
     setMethods(data?.data?.records??[]);
     const method =
      data.data.records.find((m: IShippingMethod) => m.isDefault) ??
      data.data.records[0];

    dispatch(setShippingMethod(method));
  }
}, [data]);


  return (
    <div className="mb-6">
      <label className="block mb-2 font-medium text-sm">
        {t("shoppingCart.shippingMethod")}
      </label>
      <div className="hidden-show-scrollbar flex flex-col gap-2 bg-zinc-800 p-3 border border-gray-700 rounded-lg max-h-40 overflow-y-auto">
        {methods.map((el, i) => (
          <Button
            variant={"ghost"}
            onClick={() => handleChangeShippingMethod(el)}
            key={i}
            className={`flex justify-between items-center p-2  ${
              shippingMethod?.id == el.id &&
              "shadow-md border border-primary  shadow-primary"
            }`}
          >
            <div className="flex justify-between w-full">
              <div className="font-medium text-sm">{el.title}</div>
              { el.isDefault && (
                <div>
                  <div className="text-gray-400 text-xs">
                    {t("general.default")}
                  </div>
                </div>
              )}
              <div className="flex gap-2 text-gray-400 text-xs">
                 <span>{el.estimatedDeliveryTime}</span>
                 <span>{t("shoppingCart.days")}</span> 
              </div>
            </div>
            <div className="flex gap-2 font-semibold text-sm">
              {el.price}
              <RialIcon />
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
}

export default ShippingMethod;
