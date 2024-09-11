'use client';

import { SessionProvider } from 'next-auth/react';
import React, { PropsWithChildren } from 'react';
import NextTopLoader from 'nextjs-toploader';

export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <SessionProvider>
        {children}
      </SessionProvider>

      <NextTopLoader />
    </>
  );
};
