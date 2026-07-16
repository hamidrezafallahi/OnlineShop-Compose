"use client";
import React from 'react';

import Header from './header';
import InvoiceList from './invoiceList';

export default async function CheckoutTemplate( ) {
    return (
    <div className="hidden-show-scrollbar bg-black p-4 h-screen lg:overflow-hidden overflow-y-auto text-white">
      <Header />
      <InvoiceList />
    </div>
  );
}
