import React from 'react';

import CheckoutTemplate from '@components/templates/checkoutTemplate';

export default async function CheckoutPage({ params }:{params:{locale:string}}) {
  const { locale } =await params;   

  return <CheckoutTemplate locale={locale} />;
}