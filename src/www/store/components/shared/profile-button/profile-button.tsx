'use client';

import { signIn, useSession } from 'next-auth/react';
import React from 'react';
import { Button } from '@/components/ui';

export const ProfileButton: React.FC = () => {
  const { data: session } = useSession();

  return (
    <>
      {!session &&
        <Button
          color="secondary"
          bordered
          onClick={() => signIn('yandex')}
        >
          Войти
        </Button>
      }
      {session && <Button>{JSON.stringify(session)}</Button>}
    </>
  );
};
