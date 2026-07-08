// app/[locale]/payment/success/page.tsx
"use client";

import { useEffect } from 'react';

import { useLocale } from 'next-intl';
import Link from 'next/link';
import {
  useRouter,
  useSearchParams,
} from 'next/navigation';

import {
  Card,
  CardContent,
} from '@components/atoms/defaultElements/card';
import { Button } from '@components/atoms/defaultElements/customButton';
import {
  CheckCircle,
  Download,
  Home,
  Package,
  Printer,
  RialIcon,
} from '@components/atoms/iconComponents';

interface IPaymentSuccessProps {
  params?: {};
  searchParams: {
    orderId?: string;
    transactionId?: string;
    amount?: string;
  };
}

export default function PaymentSuccess({ params }: IPaymentSuccessProps) {
  const locale = useLocale()
  const searchParams = useSearchParams();
  const router = useRouter();

  const orderId = searchParams.get('orderId') || 'N/A';
  const transactionId = searchParams.get('transactionId') || 'N/A';
  const amount = searchParams.get('amount') || '0';
  const date = new Date().toLocaleDateString(locale === 'fa' ? 'fa-IR' : 'en-US');

  // در صورت نیاز، می‌توانید داده‌ها را به سرور هم ارسال کنید
  useEffect(() => {
    // ثبت لاگ یا آمار موفقیت پرداخت
    console.log('Payment successful:', { orderId, transactionId, amount });
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadInvoice = () => {
    // منطق دانلود فاکتور
    console.log('Downloading invoice...');
  };

  return (
    <div className="bg-black p-4 min-h-screen text-white">
      <div className="mx-auto max-w-4xl">
        {/* هدر صفحه */}
        <div className="mb-8 pt-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-green-900/30 p-4 rounded-full">
              <CheckCircle config={{className:"w-16 h-16 text-green-500"}}  />
            </div>
          </div>
          <h1 className="mb-2 font-bold text-3xl">
            {locale === 'fa' ? 'پرداخت موفقیت‌آمیز بود!' : 'Payment Successful!'}
          </h1>
          <p className="text-gray-400">
            {locale === 'fa' 
              ? 'سفارش شما با موفقیت ثبت شد. جزئیات خرید در زیر آمده است.' 
              : 'Your order has been successfully placed. Purchase details are below.'}
          </p>
        </div>

        <div className="gap-6 grid grid-cols-1 lg:grid-cols-3">
          {/* بخش اصلی اطلاعات */}
          <div className="space-y-6 lg:col-span-2">
            {/* کارت تبریک */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-green-900/20 p-3 rounded-full">
                    <CheckCircle config={{className:"w-6 h-6 text-green-500"}} />
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold text-xl">
                      {locale === 'fa' ? 'سپاس از خرید شما!' : 'Thank You For Your Purchase!'}
                    </h3>
                    <p className="text-gray-400">
                      {locale === 'fa'
                        ? `سفارش شما با شماره ${orderId} ثبت شد. یک ایمیل تأیید به آدرس ایمیل شما ارسال شده است.`
                        : `Your order #${orderId} has been confirmed. A confirmation email has been sent to your email address.`}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* جزئیات سفارش */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-6">
                <h3 className="mb-4 font-semibold text-xl">
                  {locale === 'fa' ? 'جزئیات سفارش' : 'Order Details'}
                </h3>
                <div className="space-y-4">
                  <div className="gap-4 grid grid-cols-2">
                    <div>
                      <p className="text-gray-400 text-sm">
                        {locale === 'fa' ? 'شماره سفارش' : 'Order Number'}
                      </p>
                      <p className="font-mono font-semibold">{orderId}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">
                        {locale === 'fa' ? 'تاریخ سفارش' : 'Order Date'}
                      </p>
                      <p>{date}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">
                        {locale === 'fa' ? 'شماره تراکنش' : 'Transaction ID'}
                      </p>
                      <p className="font-mono text-sm">{transactionId}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">
                        {locale === 'fa' ? 'مبلغ پرداخت‌شده' : 'Amount Paid'}
                      </p>
                      <div className="flex items-center gap-1 font-semibold">
                        {amount}
                        <RialIcon config={{className:"w-4 h-4"}} />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* مراحل بعدی */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-6">
                <h3 className="mb-4 font-semibold text-xl">
                  {locale === 'fa' ? 'مراحل بعدی' : 'Next Steps'}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-900/30 p-2 rounded-full">
                      <Package config={{className:"w-5 h-5 text-blue-400"}}  />
                    </div>
                    <div>
                      <p className="font-medium">
                        {locale === 'fa' ? 'آماده‌سازی سفارش' : 'Order Processing'}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {locale === 'fa'
                          ? 'سفارش شما در حال آماده‌سازی است و به زودی ارسال می‌شود.'
                          : 'Your order is being processed and will be shipped soon.'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-900/30 p-2 rounded-full">
                      <Package config={{className:"w-5 h-5 text-purple-400"}} />
                    </div>
                    <div>
                      <p className="font-medium">
                        {locale === 'fa' ? 'پیگیری سفارش' : 'Track Your Order'}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {locale === 'fa'
                          ? 'می‌توانید از طریق پنل کاربری سفارش خود را پیگیری کنید.'
                          : 'You can track your order through your account dashboard.'}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* سایدبار اقدامات */}
          <div className="space-y-4">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-6">
                <h3 className="mb-4 font-semibold text-xl">
                  {locale === 'fa' ? 'اقدامات' : 'Actions'}
                </h3>
                <div className="space-y-3">
                  <Button
                    onClick={handlePrint}
                    className="bg-zinc-800 hover:bg-zinc-700 w-full text-white"
                    variant="outline"
                  >
                    <Printer config={{className:"ml-2 w-4 h-4"}}   />
                    {locale === 'fa' ? 'چاپ رسید' : 'Print Receipt'}
                  </Button>
                  <Button
                    onClick={handleDownloadInvoice}
                    className="bg-zinc-800 hover:bg-zinc-700 w-full text-white"
                    variant="outline"
                  >
                    <Download config={{className:"ml-2 w-4 h-4"}} />
                    {locale === 'fa' ? 'دانلود فاکتور' : 'Download Invoice'}
                  </Button>
                  <Link href={`/${locale}/orders`}>
                    <Button className="bg-primary hover:bg-primary/90 w-full text-white">
                      <Package config={{className:"ml-2 w-4 h-4"}} />
                      {locale === 'fa' ? 'مشاهده سفارشات' : 'View Orders'}
                    </Button>
                  </Link>
                  <Link href={`/${locale}`}>
                    <Button className="bg-zinc-800 hover:bg-zinc-700 w-full text-white">
                      <Home config={{className:"ml-2 w-4 h-4"}} />
                      {locale === 'fa' ? 'بازگشت به خانه' : 'Back to Home'}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* پشتیبانی */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-6">
                <h4 className="mb-2 font-semibold">
                  {locale === 'fa' ? 'نیاز به کمک دارید؟' : 'Need Help?'}
                </h4>
                <p className="mb-4 text-gray-400 text-sm">
                  {locale === 'fa'
                    ? 'تیم پشتیبانی ما ۲۴/۷ آماده پاسخگویی به سوالات شماست.'
                    : 'Our support team is available 24/7 to answer your questions.'}
                </p>
                <Link href={`/${locale}/contact`}>
                  <Button variant="link" className="p-0 text-primary">
                    {locale === 'fa' ? 'تماس با پشتیبانی →' : 'Contact Support →'}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}