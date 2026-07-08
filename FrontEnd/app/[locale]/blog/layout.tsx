import React, { ReactNode } from 'react';

import Footer from '@layout/footer';
import Header from '@layout/header';

function EntityLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default EntityLayout;
