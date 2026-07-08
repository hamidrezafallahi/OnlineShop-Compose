namespace OnlineShop.Domain.Enums
{
    public enum OrderStatus
    {
        Pending = 0,     // ثبت اولیه (کاربر سفارش رو ساخته ولی هنوز تایید نشده)
        Confirmed = 1,   // تایید شده (مثلاً بعد از پرداخت یا بررسی اولیه)
        Paid = 2,        // پرداخت شده
        Shipped = 3,     // ارسال شده
        Delivered = 4,   // تحویل داده شده
        Cancelled = 5    // لغو شده
    }
   
}
