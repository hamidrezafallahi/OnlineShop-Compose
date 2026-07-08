 export enum OrderStatus
{
    pending = 0,     // ثبت اولیه (کاربر سفارش رو ساخته ولی هنوز تایید نشده)
    confirmed = 1,   // تایید شده (مثلاً بعد از پرداخت یا بررسی اولیه)
    paid = 2,        // پرداخت شده
    shipped = 3,     // ارسال شده
    delivered = 4,   // تحویل داده شده
    cancelled = 5    // لغو شده
}
export const OrderStatusText: Record<OrderStatus, string> = {
  [OrderStatus.pending]: 'orderStatus.pending',
  [OrderStatus.confirmed]: 'orderStatus.confirmed',
  [OrderStatus.paid]: 'orderStatus.paid',
  [OrderStatus.shipped]: 'orderStatus.shipped',
  [OrderStatus.delivered]: 'orderStatus.delivered',
  [OrderStatus.cancelled]: 'orderStatus.cancelled',
};
