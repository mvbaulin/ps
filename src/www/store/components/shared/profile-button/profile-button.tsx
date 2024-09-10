import { useSession } from 'next-auth/react';
import React from 'react';

export const ProfileButton: React.FC = () => {
  const { data: session } = useSession();

  return (
    <>
      {!session && <button>Войти</button>}
      {session && <button>{JSON.stringify(session)}</button>}
    </>
  );
};
