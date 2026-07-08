// components/payment/PaymentRedirect.tsx
"use client";

import { useState } from 'react';

import { useTranslations } from 'next-intl';
import {
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { shallowEqual } from 'react-redux';

import { useAppSelector } from '@store/index';

export default function PaymentCheck() {
        const { ShoppingCart } = useAppSelector(
      (state) => ({
        ShoppingCart: state.withPersist.ShoppingCart,
      }),
      shallowEqual
    );
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'failed'>('loading');
  const t = useTranslations()
//   useEffect(() => {
//     const verifyPayment = async () => {
//       const authority = searchParams.get('Authority');
//       const status = searchParams.get('Status');

//       try {
//         // فراخوانی API برای تأیید پرداخت
//         const response = await fetch('/api/verify-payment', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             authority,
//             status,
//             gateway: paymentGateway,
//           }),
//         });

//         const data = await response.json();

//         if (data.success) {
//           // ریدایرکت به صفحه موفقیت
//           router.push(
//             `/${locale}/payment/success?` +
//             `orderId=${data.orderId}&` +
//             `transactionId=${data.transactionId}&` +
//             `amount=${data.amount}`
//           );
//         } else {
//           // ریدایرکت به صفحه شکست
//           router.push(
//             `/${locale}/payment/failed?` +
//             `errorCode=${data.errorCode}&` +
//             `errorMessage=${encodeURIComponent(data.errorMessage)}&` +
//             `orderId=${data.orderId}`
//           );
//         }
//       } catch (error) {
//         console.error('Payment verification error:', error);
//         router.push(
//           `/${locale}/payment/failed?` +
//           `errorCode=verification_error&` +
//           `errorMessage=${encodeURIComponent('خطا در تأیید پرداخت')}`
//         );
//       }
//     };

//     verifyPayment();
//   }, []);

  // نمایش اسپینر در حین تأیید پرداخت
  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center bg-black text-white">
        <div className="text-center">
          <div className="mx-auto mb-4 border-primary border-t-2 border-b-2 rounded-full w-16 h-16 animate-spin"></div>
          <p className="text-lg">
            {t("payment.verifying")}
          </p>
          <p className="mt-2 text-gray-400 text-sm">
            {t("payment.waiting")}
          </p>
          <p className="mt-2 text-gray-400 text-sm">
            {ShoppingCart?.paymentMethod?.title}
          </p>
        </div>
      </div>
    );
  }

  return null;
}