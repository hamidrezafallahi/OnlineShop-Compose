"use client";
import { ToastContainer } from 'react-toastify';

import ReduxProvider from '@store/provider';

export default function CustomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
 
  
  return (
    <ReduxProvider>
      {children}
      <ToastContainer />
    </ReduxProvider>
  );
}
