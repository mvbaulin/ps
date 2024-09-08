'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Button } from '@/components/ui';
import { Layout, Text, Title } from '@/components/shared';
import classNames from 'classnames';
import styles from './signin-form.module.scss';

export const SignInForm: React.FC = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ login, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      router.push('/dashboard/orders');
    } else {
      const data = await res.json();
      setError(data.error || 'Неизвестная ошибка');
    }

    setLogin('');
    setPassword('');
  };

  return (
    <Layout>
      <Title>Войти</Title>

      <form className={classNames(styles.form)} onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Логин"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />

        <Input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className={classNames(styles.inner)}>
          <Button type="submit">Авторизоваться</Button>

          {error && <Text>{error}</Text>}
        </div>
      </form>
    </Layout>
  );
};
