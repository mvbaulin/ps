import React from 'react';
import classNames from 'classnames';
import styles from './change-password.module.scss';
import { Title, Layout } from '@/components/shared';
import { Button, Input } from '@/components/ui';

export const ChangePassword: React.FC = () => {
  return (
    <div className={classNames(styles.wrapper)}>
      <Layout>
        <Title size="small">
          Сменить пароль
        </Title>

        <form action="" className={classNames(styles.form)}>

          <Input
            type="passpord"
            placeholder="Введите старый пароль"
          />
          <Input
            type="passpord"
            placeholder="Введите новый пароль"
          />
          <Input
            type="passpord"
            placeholder="Подтвердите новый пароль"
          />

          <Button type="submit">Применить</Button>
        </form>
      </Layout>
    </div>
  );
};
