import '../style/globals.css';

import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="fa" suppressHydrationWarning>
      <body className="bg-[radial-gradient(circle,var(--primary-color)_60%,var(--secondary-color)_100%)] min-h-screen">
        {children}
      </body>
    </html>
  );
}
