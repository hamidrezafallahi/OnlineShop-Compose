import { useTranslations } from 'next-intl';

import { OrderStatusText } from '@models/order';
import { useGetData } from '@services/base';

import { IOrder } from './type';

export default function OrderDetails({
  selectedOrderId,
}: {
  selectedOrderId: number | null;
}) {
  const t = useTranslations();
  const { data, isLoading } = useGetData<IOrder>({
    url: `/api/orders/${selectedOrderId}`,
    method: "GET",
    skip: !selectedOrderId,
  });

  if (!selectedOrderId)
    return (
      <div className="mt-40 text-gray-400 text-center">
        یک سفارش انتخاب کنید
      </div>
    );

  const order = data?.data;
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center w-full h-full">
          <div className="mx-auto mb-4 border-primary border-t-2 border-b-2 rounded-full w-16 h-16 animate-spin"></div>
        </div>
      ) : (
        <div className="space-y-6 h-[calc(100dvh-350px)]">
          <h2 className="font-semibold text-xl">جزئیات سفارش</h2>
          <div className="bg-zinc-800 p-4 border border-gray-700 rounded-lg">
            <div className="flex justify-between">
              <span>وضعیت:</span>
              {order?.status !== undefined && (
                <span>{t(OrderStatusText[order.status])}</span>
              )}
            </div>
          </div>

          {/* Items */}
          <div className="hidden-show-scrollbar space-y-3 h-full overflow-y-auto">
            {order?.items.map((item, index) => (
              <div
                key={index}
                className="flex gap-4 bg-zinc-800 p-3 border border-gray-700 rounded-lg"
              >
                <img
                  src={item.product.image}
                  className="rounded w-20 h-20 object-cover"
                />

                <div className="flex flex-col flex-1 justify-between">
                  <div className="text-sm">{item.product.name}</div>
                  <div className="text-gray-400 text-xs">
                    {item.quantity} عدد
                  </div>
                  <div className="text-gray-400 text-xs">
                    {item.product.description}
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-semibold text-sm">
                    {item.unitPrice} تومان
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-zinc-800 p-4 border border-gray-700 rounded-lg">
            <div className="flex justify-between mb-1 text-sm">
              <span>جمع سفارش</span>
              <span>{order?.totalPrice} تومان</span>
            </div>
            <div className="flex justify-between mb-1 text-gray-400 text-sm">
              <span>هزینه ارسال</span>
              <span>{order?.shippingMethod.cost} تومان</span>
            </div>
            <div className="flex justify-between mb-1 text-green-400 text-sm">
              <span>تخفیف</span>
              <span>{order?.discountPrice} تومان</span>
            </div>

            <div className="flex justify-between mt-4 font-bold text-lg">
              <span>مبلغ نهایی</span>
              <span>{(order?.totalPrice!+order?.shippingMethod?.cost!)-order?.discountPrice!} تومان</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
