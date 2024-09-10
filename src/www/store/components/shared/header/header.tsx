'use client';

import React from 'react';
import classNames from 'classnames';
import styles from './header.module.scss';
import { Button } from '@/components/ui/button/button';
import { useSession, signIn } from 'next-auth/react';
import { ProfileButton } from '../profile-button/profile-button';

export const Header: React.FC = () => {
  const { data } = useSession();

  console.log(data, 999);

  return (
    <header className={classNames(styles.header)}>
      <div className={classNames(styles.inner)}>
        <button
          onClick={() => signIn('yandex', {
            callbackUrl: '/cart',
            redirect: true
          })}
        >
            Войти
        </button>

        <ProfileButton />
      </div>
    </header>
  );
};
