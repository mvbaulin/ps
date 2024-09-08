'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import classNames from 'classnames';
import styles from './signout-form.module.scss';
import { Button } from '@/components/ui';

export const SignOutForm: React.FC = () => {
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        router.push('/');
      } else {
        const result = await response.json();
        setError(result.error || 'Произошла ошибка при выходе');
      }
    } catch (error) {
      console.error('Ошибка при выходе:', error);
      setError('Ошибка сервера');
    }
  };

  return (
    <form className={classNames(styles.form)} onSubmit={handleSubmit}>
      <Button color="secondary" type="submit">
        Выйти
      </Button>
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
};
