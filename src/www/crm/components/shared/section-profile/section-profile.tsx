import React from 'react';
import classNames from 'classnames';
import styles from './section-profile.module.scss';
import {
  Section,
  ChangePassword,
  Card,
  SignOutForm
} from '@/components/shared';

export const SectionProfile: React.FC = () => {
  return (
    <Section title="Профиль">
      <div className={classNames(styles.wrapper)}>
        <ChangePassword />

        <div className={classNames(styles.inner)}>
          <Card
            title="Последняя смена пароля"
            text="06.08.2022"
          />

          <Card
            type="contrast"
            title="Важно!"
            text="Пароль необходимо менять каждые 30 дней, в случае если вы не
            смените пароль - вам будет заблокирован доступ к личному кабинету.
            В случае, если вы были заблокированы -
            необходимо обратиться к администрации."
          />
        </div>
      </div>

      <SignOutForm />
    </Section>
  );
};
