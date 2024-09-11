'use client';

import { useSession } from 'next-auth/react';
import React from 'react';
import { Button } from '@/components/ui';

export const ProfileButton: React.FC = () => {
  const { data: session } = useSession();

  return (
    <>
      {!session && <Button color="secondary" bordered>Войти</Button>}
      {session && <Button>{JSON.stringify(session)}</Button>}
    </>
  );
};
