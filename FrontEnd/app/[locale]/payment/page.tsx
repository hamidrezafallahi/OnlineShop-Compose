import React from 'react';

import PaymentFailed from '@components/templates/payment/paymentFailed';
import PaymentSuccess from '@components/templates/payment/paymentSuccess';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ params, searchParams }: Props) {
  const resolvedParams = await params;
  const resolvedSearchParams = searchParams ? await searchParams : {};

  // بررسی وضعیت پرداخت از searchParams
  const status = resolvedSearchParams?.status as string;
  const errorCode = resolvedSearchParams?.errorCode as string;
  const errorMessage = resolvedSearchParams?.errorMessage as string;
  const orderId = resolvedSearchParams?.orderId as string;
  const amount = resolvedSearchParams?.amount as string;
  const transactionId = resolvedSearchParams?.transactionId as string;

  // نمایش کامپوننت مناسب بر اساس وضعیت
  if (status === 'success') {
    return (
      <PaymentSuccess
        searchParams={{
          amount: amount || "0",
          transactionId: transactionId || "",
          orderId: orderId || "",
        }}
      />
    );
  }

  return (
    <PaymentFailed
      searchParams={{
        errorCode: errorCode || "unknown_error",
        errorMessage: errorMessage || "پرداخت ناموفق بود",
        orderId: orderId || "",
      }}
    />
  );
}