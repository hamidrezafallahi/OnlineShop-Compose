"use client";
import React from 'react';

import { useTranslations } from 'next-intl';

import Header from './header';
import InvoiceList from './invoiceList';

export default function CheckoutTemplate({ ...props }: IProps) {
  const { locale } = props;
  const t = useTranslations();
  return (
    <div className="hidden-show-scrollbar bg-black p-4 h-screen lg:overflow-hidden overflow-y-auto text-white">
      <Header />
      <InvoiceList />
    </div>
  );
}
