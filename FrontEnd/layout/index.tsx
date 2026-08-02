"use client";
import { ToastContainer } from 'react-toastify';

import RuntimeErrorBridge from '@components/organisms/runtimeErrorBridge';
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
      <RuntimeErrorBridge />
    </ReduxProvider>
  );
}
