import React from 'react';

import PaymentFailed from '@components/templates/payment/paymentFailed';
import PaymentSuccess from '@components/templates/payment/paymentSuccess';

export default function PaymentPage({ params }) {
  const { locale } = params;
  return (
    <>
      
     <PaymentFailed 
        searchParams={{
    errorCode: "insufficient_funds",
    errorMessage: "insufficient_funds",
    orderId: "12",
  }}/>
       <PaymentSuccess 
       searchParams={{
    amount: "amount",
    transactionId: "transactionId",
    orderId: "12",
  }} 
      />
    </>
  );
};

 
