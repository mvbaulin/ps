'use client';

import { SessionProvider } from 'next-auth/react';
import React, { PropsWithChildren, useEffect } from 'react';
import NextTopLoader from 'nextjs-toploader';

export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SessionProvider>
        {children}
      </SessionProvider>

      <NextTopLoader />
    </>
  );
};
