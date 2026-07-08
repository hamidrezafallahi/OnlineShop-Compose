import React, { useEffect } from 'react';

import { useTranslations } from 'next-intl';
import { useDispatch } from 'react-redux';

import { RadioList } from '@components/atoms/defaultElements/customRadio';
import { DataResponse } from '@models/base';
import { IPaymentMethod } from '@models/paymentMethod';
import { useGetData } from '@services/base';
import { setPaymentMethod } from '@slice/shoppingCartSlice';
import { useAppSelector } from '@store/index';

export default function PaymentMethod() {
     const selectedPaymentMethod = useAppSelector(
      (state) => state.withPersist.ShoppingCart.paymentMethod?.id
    );
    const t = useTranslations()
  const dispatch = useDispatch();
  const { data } = useGetData<DataResponse<IPaymentMethod>>({
    url: 'api/paymentMethods',
    method: 'GET',
  });
const handleChangePaymentMethod = (e:string|number)=>{
dispatch(setPaymentMethod(data?.data.records.find((method) => method.id ===e )!))
}
useEffect(()=>{
  if(data?.isSuccess){
     dispatch(setPaymentMethod(data?.data.records.find((method) => method.displayOrder == 1)!))
  }
},[data])
  return (
    <div className="mb-4">
      <h3 className="mb-2">{t("general.paymentMethod")}</h3>
      <div className="space-y-2 bg-zinc-800 p-3 border border-gray-700 rounded-lg">
          <RadioList
          name='paymentMethods'
          className='!flex-row justify-between gap-2 text-gray-400 text-xs'
            options={data?.data.records?.map((method) => ({label:method.title,value:method.id}))||[]}
             onChange={handleChangePaymentMethod}
             value={selectedPaymentMethod}
            // checked={selectedPaymentMethod === method.id}
            // onChange={() => dispatch(setPaymentMethodId({ paymentMethodId: method.id }))}
          />
      </div>
    </div>
  );
}
